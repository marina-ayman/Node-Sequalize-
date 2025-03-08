const passport = require("../config/webpassport");

module.exports = (req, res, next) => {
    console.log("🔹 Middleware Triggered_____________________________________");
    console.log("🔹 Incoming Request Headers:", req.headers);

    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        console.log("🔹 Passport Authentication Triggered");

        if (err) {
            console.error("❌ Passport Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!user) {
            console.warn("⚠️ Unauthorized Access:", info?.message);
            return res.status(401).json({ error: "Unauthorized", details: info?.message });
        }

        console.log("✅ User Authenticated:", user);
        req.user = user;
        next();
    })(req, res, next);
};
