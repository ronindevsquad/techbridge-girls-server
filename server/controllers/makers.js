const getConnection = require("../config/mysql");
const jwt = require("jsonwebtoken");
const jwtKey = require("../../keys").jwtKey;
const mailgun = require('mailgun-js')({
  apiKey: require('../../keys').mailgunKey,
  // Replace with evergreenmake.com, have to verify first?
  domain: 'sandboxc2f9638ced9f445683d40e1b91c7a19a.mailgun.org'
});
const Promise = require("bluebird");
const uuid = require("uuid/v1");

const bcrypt = Promise.promisifyAll(require("bcrypt"));
const using = Promise.using;

module.exports = {
  show: function (req, res) {
    using(getConnection(), connection => {
      const query = "SELECT company, contact, email, picture, homepage, facebook, instagram, " +
        "linkedin, twitter FROM makers WHERE id = UNHEX(?) LIMIT 1";
      return connection.execute(query, [req.params.id]);
    })
      .spread(data => {
        if (data.length != 1)
          return res.status(400).json({ message: "Could not find maker." });
        return res.json(data[0]);
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({ message: "Please contact an admin." });
      })
  },
  notifications: function (req, res) {
    Promise.join(using(getConnection(), connection => {
      const query = "SELECT u.id , p.proposals AS proposals, j.jobs AS jobs FROM makers u " +
        "LEFT OUTER JOIN (SELECT maker_id, COUNT(id) AS proposals FROM proposals WHERE status = 0 GROUP BY maker_id) p " +
        "ON u.id = p.maker_id " +
        "LEFT OUTER JOIN (SELECT maker_id, COUNT(id) AS jobs FROM proposals WHERE status = 2 GROUP BY maker_id) j " +
        "ON j.maker_id = u.id " +
        "WHERE u.id = UNHEX(?) GROUP BY u.id";
      return connection.execute(query, [req.params.id]);
    }), using(getConnection(), connection => {
      const query = "SELECT COUNT(*) as unread FROM messages WHERE proposal_id in " +
        "(SELECT id FROM proposals WHERE maker_id = UNHEX(?)) " +
        "AND status = 0 AND maker_id != UNHEX(?)";
      return connection.execute(query, [req.params.id, req.params.id]);
    }), (proposals, messages) => {
      let data = {};
      if (proposals[0].length == 0)
        return res.status(400).json({ message: "Could not find maker." });

      data.proposals = proposals[0][0].proposals;
      data.jobs = proposals[0][0].jobs;
      data.messages = messages[0][0].unread;

      return res.json(data);
    })
      .catch(err => {
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  update: function (req, res) {
    using(getConnection(), connection => {
      let query = "UPDATE makers SET ?, updated_at = NOW() WHERE id = UNHEX(?) LIMIT 1";
      return connection.execute(query, [req.body, req.user.id]);
    })
      .spread(data => {
        if (data.changedRows == 0)
          throw { status: 400, message: "Failed to save changes." };

        return using(getConnection(), connection => {
          let query = "SELECT *, HEX(id) AS id FROM makers WHERE id = UNHEX(?) LIMIT 1";
          return connection.execute(query, [req.user.id]);
        });
      })
      .spread(data => {
        let anvyl_token = jwt.sign({
          id: data[0].id,
          type: 0,
          company: data[0].company,
          contact: data[0].contact,
          created_at: data[0].created_at
        }, jwtKey, { expiresIn: "5d" });
        return res.json(anvyl_token);
      })
      .catch(err => {
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  delete: function (req, res) {
    using(getConnection(), connection => {
      return connection.execute("DELETE FROM makers WHERE id = UNHEX(?) LIMIT 1", [req.user.id]);
    })
      .spread(data => {
        if (data.affectedRows == 0)
          return res.status(400).json({ message: "Failed to delete your account." });
        return res.end();
      })
      .catch(err => {
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  changePassword: function (req, res) {
    if (!/^(?=.*[a - z])(?=.*[A - Z])(?=.*\d)[A - Za - z\d$@$!%*?&](?=.{7,}) /.test(req.body.new))
      return res.status(400).json({ message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number." });

    bcrypt.genSaltAsync(10)
      .then(salt => {
        return bcrypt.hash(req.body.new, salt)
      })
      .then(hash => {
        return using(getConnection(), connection => {
          const query = "UPDATE makers SET password = ?, updated_at = NOW() WHERE id = UNHEX(?) LIMIT 1";
          return connection.execute(query, [hash, req.user.id]);
        })
      })
      .spread(data => {
        if (data.changedRows == 0)
          throw { status: 400, message: "Unable to change password." };
        return res.end();
      })
      .catch(err => {
        if (err.status)
          return res.status(err.status).json({ message: err.message });
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  register: function (req, res) {
    if (req.body.type !== 0 || !req.body.company || !req.body.contact || !req.body.email
      || !req.body.password || !req.body.confirm_password)
      return res.status(400).json({ message: "All form fields are required." });

    // Validate company:
    if (!req.body.company)
      return res.status(400).json({ message: "Company name cannot be blank." });

    // Validate contact:
    if (!/^[a-z ]{2,32}$/i.test(req.body.contact))
      return res.status(400).json({ message: "Invalid contact name." });

    // Validate email:
    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
      return res.status(400).json({ message: "Invalid email. Email format should be: email@mailserver.com." });

    // Validate password:
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
      return res.status(400).json({ message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number." });

    // Validate confirm_password:
    if (req.body.password != req.body.confirm_password)
      return res.status(400).json({ message: "Passwords do not match." });

    // Valid maker, encrypt password and save:
    bcrypt.genSaltAsync(10)
      .then(salt => {
        return bcrypt.hashAsync(req.body.password, salt)
      })
      .then(hash => {
        const mail = {
          from: 'Evergreen HQ hello@evergreenmake.com',
          to: `${req.body.email}`,
          subject: 'Welcome to Evergreen!',
          // text: `Greetings from Evergreen HQ,\n\nThe Evergreen team would like to welcome you to the platform. If you need anything, feel free to contact us at 1-800-416-0426\n\nThank You,\nEvergreen`
          html: '<html><img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_banner.png" width="70%" height="auto">' +
          '<p>Greetings from Evergreen HQ,</p> ' +
          '<p>Welcome to the Evergreen community. As a supplier you can connect with consumer goods companies in the US that need high quality suppliers like yourself.</p>' +
          '<p>Get started by browsing the open proposals section and viewing some of the available RFPs. Makers around the globe are actively submitting bids to create better products.</p>' +
          '<img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_demo.png" width="70%" height="auto">' +
          '<p>We are looking for feedback to improve the site. If you have any questions, shoot over an email to <a href="mailto:support@evergreenmake.com">support@evergreenmake.com</a> or call our leadership team directly at 1-800-416-0419.</p></html>'
        };
        console.log(hash)
        return hash;
        // return new Promise((resolve, reject) => {
        // 	mailgun.messages().send(mail, function (err, body) {
        // 		if (err)
        // 			return reject({ status: 400, message: "Email does not exist." });
        // 	  return resolve(hash);
        // 	});
        // });
      })
      .then(hash => {
        return using(getConnection(), connection => {
          const data = [uuid().replace(/\-/g, ""), req.body.company, req.body.contact, req.body.email, hash];
          const query = "INSERT INTO makers SET id = UNHEX(?), company = ?, " +
            "contact = ?, email = ?, password = ?, created_at = NOW(), updated_at = NOW()";
          return connection.execute(query, data);
        })
      })
      .then(() => {
        return using(getConnection(), connection => {
          const query = "SELECT *, HEX(id) AS id FROM makers WHERE email = ? LIMIT 1";
          return connection.execute(query, [req.body.email]);
        });
      })
      .spread(data => {
        const anvyl_token = jwt.sign({
          id: data[0].id,
          type: 0,
          company: data[0].company,
          contact: data[0].contact,
          created_at: data[0].created_at
        }, jwtKey, { expiresIn: "5d" });
        return res.json(anvyl_token);
      })
      .catch(err => {
        if (err["code"] == "ER_DUP_ENTRY")
          return res.status(400).json({ message: "Email already in use, please log in." });
        else if (err.status)
          return res.status(err.status).json({ message: err.message });
        else
          return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  registerLinkedIn: function (req, res) {
    if (req.body.type !== 0 || !req.body.company || !req.body.contact || !req.body.email)
      return res.status(400).json({ message: "All form fields are required." });

    // Validate company:
    if (!req.body.company)
      return res.status(400).json({ message: "Company name cannot be blank." });

    // Validate contact:
    if (!/^[a-z ]{2,32}$/i.test(req.body.contact))
      return res.status(400).json({ message: "Invalid contact name." });

    // Validate email:
    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
      return res.status(400).json({ message: "Invalid email. Email format should be: email@mailserver.com." });

    // Valid maker, encrypt password and save:
    bcrypt.genSaltAsync(10)
      .then(salt => {
        return bcrypt.hashAsync(uuid().replace(/\-/g, ""), salt);
      })
      .then(hash => {
        const mail = {
          from: 'Evergreen HQ hello@evergreenmake.com',
          to: `${req.body.email}`,
          subject: 'Welcome to Evergreen!',
          // text: `Greetings from Evergreen HQ,\n\nThe Evergreen team would like to welcome you to the platform. If you need anything, feel free to contact us at 1-800-416-0426\n\nThank You,\nEvergreen`
          html: '<html><img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_banner.png" width="70%" height="auto">' +
          '<p>Greetings from Evergreen HQ,</p> ' +
          '<p>Welcome to the Evergreen community. As a supplier you can connect with consumer goods companies in the US that need high quality suppliers like yourself.</p>' +
          '<p>Get started by browsing the open proposals section and viewing some of the available RFPs. Makers around the globe are actively submitting bids to create better products.</p>' +
          '<img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_demo.png" width="70%" height="auto">' +
          '<p>We are looking for feedback to improve the site. If you have any questions, shoot over an email to <a href="mailto:support@evergreenmake.com">support@evergreenmake.com</a> or call our leadership team directly at 1-800-416-0419.</p></html>'
        };

        return new Promise((resolve, reject) => {
          mailgun.messages().send(mail, function (err, body) {
            if (err)
              reject({ status: 400, message: "Email does not exist." });
            resolve();
          });
        });
      })
      .then(() => {
        return using(getConnection(), connection => {
          const data = [uuid().replace(/\-/g, ""), req.body.company, req.body.contact,
          req.body.email, hash];
          const query = "INSERT INTO makers SET id = UNHEX(?), company = ?, contact = ?, " +
            "email = ?, password = ?, created_at = NOW(), updated_at = NOW()";
          return connection.execute(query, data);
        })
      })
      .then(() => {
        return using(getConnection(), connection => {
          const query = "SELECT *, HEX(id) AS id FROM makers WHERE email = ? LIMIT 1";
          return connection.execute(query, [req.body.email]);
        });
      })
      .spread(data => {
        const anvyl_token = jwt.sign({
          id: data[0].id,
          type: 0,
          company: data[0].company,
          contact: data[0].contact,
          created_at: data[0].created_at
        }, jwtKey, { expiresIn: "5d" });
        return res.json(anvyl_token);
      })
      .catch(err => {
        if (err["code"] == "ER_DUP_ENTRY")
          return res.status(400).json({ message: "Email already in use, please log in." });
        else if (err.status)
          return res.status(err.status).json({ message: err.message });
        else
          return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  login: function (req, res) {
    // Validate login data:
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "All form fields are required." });

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
      return res.status(400).json({ message: "Invalid password." });

    using(getConnection(), connection => {
      // Get maker by email:
      const query = "SELECT *, HEX(id) AS id FROM makers WHERE email = ? LIMIT 1";
      return connection.execute(query, [req.body.email]);
    })
      .spread(data => {
        if (data.length == 0)
          throw { status: 400, message: "Email does not exist, please register." };

        // Check valid password:
        return [bcrypt.compareAsync(req.body.password, data[0].password), data];
      })
      .spread((isMatch, data) => {
        if (!isMatch)
          throw { status: 400, message: "Email/password does not match." };

        const anvyl_token = jwt.sign({
          id: data[0].id,
          type: 0,
          company: data[0].company,
          contact: data[0].contact,
          created_at: data[0].created_at,
          picture: data[0].picture,
        }, jwtKey, { expiresIn: "5d" });
        return res.json(anvyl_token);
      })
      .catch(err => {
        console.log(err)
        if (err.status)
          return res.status(err.status).json({ message: err.message });
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  loginLinkedIn: function (req, res) {
    // Validate login data:
    if (!req.body.email)
      return res.status(400).json({ message: "LinkedIn login was unsuccessful" });

    using(getConnection(), connection => {
      // Get maker by email:
      const query = "SELECT *, HEX(id) AS id FROM makers WHERE email = ? LIMIT 1";
      return connection.execute(query, [req.body.email]);
    })
      .spread(data => {
        if (data.length == 0)
          throw { status: 400, message: "Email does not exist, please register." };

        // Check valid password:
        const anvyl_token = jwt.sign({
          id: data[0].id,
          type: 0,
          company: data[0].company,
          contact: data[0].contact,
          created_at: data[0].created_at
        }, jwtKey, { expiresIn: "5d" });
        return res.json(anvyl_token);
      })
      .catch(err => {
        if (err.status)
          return res.status(err.status).json({ message: err.message });
        return res.status(400).json({ message: "Please contact an admin." });
      });
  },
  sendTicket: function (req, res) {
    using(getConnection(), connection => {
      const query = "SELECT * FROM makers WHERE id = UNHEX(?) LIMIT 1";
      return connection.execute(query, [req.user.id]);
    })
      .spread(data => {
        const mail = {
          from: 'Evergreen Admin hello@evergreenmake.com',
          to: 'hello@evergreenmake.com',  // Recipient Here (need to verify in mailgun free account)
          subject: `Ticket issued from maker ${data[0].contact} at ${data[0].company}`,
          text: `${req.body.text}\n\nReach out to ${data[0].email} for support.`
        };

        mailgun.messages().send(mail, function (err, body) {
          if (err)
            throw err;
          return res.json("A ticket has been sent.");
        });
      })
      .catch(err => {
        if (err.status)
          return res.status(err.status).json({ message: err.message });
        return res.status(400).json({ message: "Please contact an admin." });
      });
  }
}