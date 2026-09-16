window.SL_HOOKS = {
    context: function() {
        var q = {};
        try {
            new URLSearchParams(location.search).forEach(function(v, k) {
                q[k] = v;
            });
        } catch (e) {}
        var authed = q.auth === "done" || q.auth === "toss" && !!q.sid;
        if (window.DIRECT_ENTRY === "authed" && q.auth !== "need") authed = true;
        try {
            var t = parseInt(q.seats || "", 10);
            if (t >= 1 && t <= 9) sessionStorage.setItem("directSeats", String(t));
            var n = q.tcid || q.toss_click_id, i = q.creative_id;
            if (n) localStorage.setItem("directTossClickId", n);
            if (i) localStorage.setItem("directCreativeId", i);
        } catch (e) {}
        var seats = q.seats || "";
        try {
            if (!seats) {
                var ss = parseInt(sessionStorage.getItem("directSeats") || "", 10);
                if (ss >= 1 && ss <= 9) seats = String(ss);
            }
        } catch (e) {}
        var lpCtx = {};
        try {
            lpCtx = JSON.parse(sessionStorage.getItem("sl420.lpCtx") || "{}") || {};
        } catch (e) {}
        if (q.lp || q.from || q.who || q.q) {
            lpCtx = {
                lp: q.lp || "",
                from: q.from || "",
                who: q.who || "",
                q: q.q || "",
                at: Date.now()
            };
            try {
                sessionStorage.setItem("sl420.lpCtx", JSON.stringify(lpCtx));
            } catch (e) {}
        }
        var lpAgree = null;
        try {
            var ag = JSON.parse(sessionStorage.getItem("sl420.lpAgree") || "null");
            if (ag && ag.req && Date.now() - (+ag.at || 0) < 30 * 60 * 1e3) lpAgree = ag;
        } catch (e) {}
        if (q.agree === "1") lpAgree = {
            req: true,
            mkt: q.mkt === "1",
            at: Date.now(),
            src: "query"
        };
        var ls = function(k) {
            try {
                return localStorage.getItem(k) || "";
            } catch (e) {
                return "";
            }
        };
        var ck = function(k) {
            try {
                var m = document.cookie.match(new RegExp("(?:^|;\\s*)" + k + "=([^;]+)"));
                return m ? decodeURIComponent(m[1]) : "";
            } catch (e) {
                return "";
            }
        };
        var sa = {};
        try {
            sa = JSON.parse(ls("sono_attr") || "{}") || {};
        } catch (e) {}
        var attr = {
            source: q.from || "direct",
            abGroup: (q.ab_group || q.lp || ck("sono_lv") || lpCtx.lp || "").slice(0, 16),
            campaignId: q.campaign_id || q.utm_campaign || sa.campaign_id || sa.utm_campaign || "",
            creativeId: q.creative_id || q.utm_content || ls("directCreativeId") || sa.creative_id || "",
            tcid: q.tcid || q.toss_click_id || ls("directTossClickId") || sa.tcid || "",
            fbclid: q.fbclid || "",
            fbp: ck("_fbp"),
            trackingCode: q.rc || "",
            referralCode: q.ref || "",
            anonymousId: ls("sono_anon_id")
        };
        return {
            authed: authed,
            name: q.name || "",
            seats: seats,
            sid: q.sid || "",
            lp: q.lp || q.ab_group || lpCtx.lp || "",
            from: q.from || lpCtx.from || "",
            who: q.who || (authed ? lpCtx.who : "") || "",
            q: q.q || lpCtx.q || "",
            lead: q.lead || "",
            utm_content: q.utm_content || "",
            lpAgree: lpAgree,
            attr: attr,
            query: q,
            referrer: document.referrer || ""
        };
    },
    track: function(event, state) {
        try {
            if (typeof window.sonoTrack === "function") window.sonoTrack(event, state);
        } catch (e) {}
        return Promise.resolve();
    },
    requestAuth: function(state) {
        return Promise.resolve({
            skipWait: false
        });
    },
    confirmAuth: function(state) {
        return new Promise(function(res) {
            setTimeout(function() {
                res({
                    ok: true
                });
            }, 300);
        });
    },
    searchAddress: function(state) {
        return new Promise(function(res) {
            setTimeout(function() {
                res({
                    zip: "06236",
                    addr1: "서울특별시 강남구 테헤란로 152"
                });
            }, 400);
        });
    },
    payMethods: function() {
        return [ "card" ];
    },
    registerPayment: function(state) {
        return Promise.resolve({
            ok: true
        });
    },
    startSign: function(state) {
        return new Promise(function(res) {
            setTimeout(function() {
                res({
                    ok: true
                });
            }, 600);
        });
    },
    onComplete: function(state) {
        return Promise.resolve();
    },
    ask: function(text, lib) {
        return Promise.resolve(lib.match(text));
    }
};