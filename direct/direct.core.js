(function() {
    "use strict";
    var H = window.SL_HOOKS;
    if (!H) throw new Error("direct.hooks.js must be loaded before direct.core.js");
    var $ = function(s, r) {
        return (r || document).querySelector(s);
    };
    var $$ = function(s, r) {
        return [].slice.call((r || document).querySelectorAll(s));
    };
    var won = function(n) {
        return n.toLocaleString("ko-KR");
    };
    var q = new URLSearchParams(location.search);
    var CTX = H.context() || {};
    var MODE = CTX.authed ? "A" : "B";
    var STATE = function(extra) {
        var o = {
            ctx: CTX,
            mode: MODE,
            step: typeof ORDER !== "undefined" && typeof idx !== "undefined" ? ORDER[idx] : null,
            name: NAME,
            seats: SEATS,
            who: typeof WHO !== "undefined" ? WHO : [],
            payMethod: typeof PAYM !== "undefined" ? PAYM : "card",
            lead: CTX.lead || "",
            utm_content: CTX.utm_content || "",
            q: CTX.q || ""
        };
        if (extra) for (var k in extra) o[k] = extra[k];
        return o;
    };
    var TRACK = function(ev, data) {
        try {
            Promise.resolve(H.track(ev, STATE(data))).catch(function() {});
        } catch (e) {}
    };
    var NAME = (CTX.name || "").trim();
    var SEATS = Math.min(3, Math.max(1, parseInt(CTX.seats, 10) || (MODE === "A" ? 2 : 1)));
    TRACK("direct_arrived", {
        mode: MODE
    });
    var LP_FLOW = CTX.from === "lp_flow" || !!(CTX.lpAgree && CTX.lpAgree.src === "query") && !!CTX.seats;
    var ORDER = MODE === "B" ? LP_FLOW ? [ "s1", "s2", "s3", "s4", "s5" ] : [ "s0", "s1", "s2", "s3", "s4", "s5" ] : [ "s0", "s2", "s3", "s4", "s5" ];
    var PG = {
        s0: 0,
        s1: 0,
        s2: 1,
        s3: 2,
        s4: 3,
        s5: 3
    };
    var PGN = [ "본인인증", "구좌선택", "가입정보", "결제·서명" ];
    var TERMS = {
        1: {
            t: "개인정보 수집·이용 및 제3자 제공",
            b: '주식회사 비즈이노(이하 "회사")는 소노라이프420 상조 가입 신청 서비스 제공을 위하여 아래와 같이 개인정보를 처리합니다.\n<b>1. 수집하는 개인정보 항목</b>\n본인인증(통합인증): 이름, 휴대전화번호, 생년월일, 성별, 내외국인 구분, CI(연계정보)\n가입 신청: 이메일, 주소, 결제수단 정보(계좌·카드는 가입 처리 외 저장하지 않음)\n<b>2. 수집 방법</b>\n본인확인 중계 서비스(바로써트 / (주)링크허브)를 통해 토스(비바리퍼블리카) 본인확인으로 수집 — 이용자가 토스 인증으로 본인 확인\n가입 신청 화면에서 이용자가 직접 입력\n<b>3. 이용 목적</b>\n소노라이프420 상조 상품 가입 신청 접수 및 본인 확인\nCI(연계정보)를 통한 회원 식별·중복가입 확인 및 가입 이력 관리\n가입 처리·상담·민원 응대, 부정 가입 방지\n<b>4. 제3자 제공</b>\n제공받는 자: (주)소노스테이션\n제공 항목: 이름, 휴대전화번호, 생년월일, 성별, CI 등 가입 처리에 필요한 정보\n제공 목적: 소노라이프420 상조 계약 체결·이행(전자청약·결제·증서 발송)\n<b>5. 처리 위탁</b>\n(주)링크허브(바로써트): 본인확인 서비스 중계(토스 인증 연계, CI 발급·전달)\n회사는 (주)소노스테이션의 회원등록 모집·유지·관리 업무를 위탁받아 처리합니다.\n<b>6. 보유 및 이용 기간</b>\nCI(연계정보) 및 가입 고객정보: 회원 식별·중복가입 확인 및 (주)소노스테이션 가입 연계 목적으로 회사의 고객관리시스템(CRM)에 암호화하여 보관합니다.\n회원 탈퇴 또는 수집·이용 목적 달성 시 지체 없이 파기하되, 관계 법령(전자상거래법·할부거래법 등)에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.\nCI는 회원 식별 용도로만 이용하며, 그 외의 목적으로 저장·활용하지 않습니다. (정보통신망법 제23조의6)\n<b>7. 이용자 권리</b>\n이용자는 개인정보 열람·정정·삭제·처리정지를 요청할 수 있으며, 수집·이용 동의를 거부할 권리가 있습니다. (거부 시 가입 신청이 제한될 수 있습니다.)\n<b>8. 사업자 정보</b>\n주식회사 비즈이노 | 대표 조철석 | 사업자등록번호 824-86-02238\n서울특별시 강남구 테헤란로 313, 제1동 제9층 제9호(역삼동, 성지하이츠1)\n상품 제공: (주)소노스테이션 | 판매: 주식회사 비즈이노'
        },
        2: {
            t: "[선택] 혜택·안내 정보 수신 동의",
            b: '주식회사 비즈이노(이하 "회사")는 「개인정보 보호법」 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에 따라, 고객님께 소노라이프420 및 소노아임레디 관련 혜택·이벤트·안내를 제공하기 위해 아래와 같이 개인정보를 수집·이용하고자 합니다.\n<b>1. 수집·이용 목적</b>\n소노라이프420·소노아임레디 상품·혜택·이벤트·기획전 안내\n가입 상담 및 만족도 조사, 멤버십 혜택 안내\n카카오 알림톡·문자·전화·이메일을 통한 마케팅 정보 발송\n<b>2. 수집 항목</b>\n성명, 생년월일, 연락처(휴대전화), 이메일, 가입·상담 이력\n<b>3. 보유·이용 기간</b>\n동의일로부터 2년 (동의 철회 또는 목적 달성 시 지체 없이 파기)\n<b>4. 안내 수단</b>\n카카오 알림톡, 문자(SMS·LMS), 전화, 이메일\n<b>5. 동의 거부 권리 및 철회</b>\n본 동의는 선택 사항이며, 동의하지 않으셔도 소노라이프420 가입(계약)에는 제한이 없습니다.\n동의 후에도 고객센터(1555-4118) 또는 수신 메시지 내 수신거부를 통해 언제든지 철회할 수 있습니다.\n※ 본 동의를 거부하는 경우, 혜택·이벤트 등 상품소개 및 가입상담 안내 서비스 제공이 제한됩니다.'
        },
        3: {
            t: "결제 약관",
            b: "1. 본 상품 가입 시, 첫 회차 납입금(또는 가입비 등)은 가입 완료와 동시에 지정하신 결제수단(출금계좌 또는 신용카드)을 통해 즉시 출금 및 결제 처리가 진행됨에 동의합니다. 월 납입금은 별도의 통지없이 본인의 지정 출금계좌에서 수납기관이 정한 지정출금일(휴일인 경우 익영업일)에 출금 및 납부 됩니다.\n\n2. 월 납입금은 별도의 통지없이 본인의 지정 출금계좌에서 수납기관이 정한 지정출금일(휴일인 경우 익영업일)에 출금 및 납부 됩니다.\n\n3. 출금이체를 위하여 지정 출금계좌의 예금을 출금하는 경우, 예금약관이나 약정서 규정에 우선하며 예금청구서나 수표없이 출금이체가 진행됩니다.\n\n4. 출금이체 지정계좌의 예금잔액(자동대출약정이 있는 경우 대출한도 포함)이 지정 출금일 현재 수납기관의 청구금액보다 부족하거나, 예금의 지급제한 또는 약정대출의 연체 등으로 대체납부가 불가능한 경우, 손해의 책임은 본인에게 있습니다.\n\n5. 지정 출금일에 동일한 수종의 출금이체청구가 있는 경우 은행이 정한 우선순위에 따라 출금이체가 진행됩니다.\n\n6. 출금이체 신규신청에 의한 이체개시일은 수납기관의 사정에 의하여 결정됩니다.\n\n7. 출금이체신청(신규, 해지)은 해당납기일 5일전까지 신청서를 제출하여야합니다.\n\n8. 출금이체 신청에 의한 지정계좌에서의 출금은 수납기관의 청구대로 출금키로 하며 출금요금에 이의가 있는 경우에는 본인과 수납기관이 협의하여 조정키로 합니다.\n\n9. 출금이체금액은 해당 지정출금일 은행 영업시간 내에 입금된 예금(지정 출금일에 입금된 타점권은 제외)에 한하여 출금처리 됩니다.\n\n10. 이 약관은 신청서를 수납기관에 직접 제출하여 출금이체를 신청한 경우에도 적용합니다.\n\n11. 본 신청과 관련하여 본인은 금융거래정보를 출금이체를 신규 신청하는 때로부터 해지 신청할 때까지 상기 수납기관에 제공하는 것에 대하여 『금융실명거래 및 비밀보장에 관한 법률』의 규정에 따라 동의합니다.\n\n12. 타인의 명의로 신용카드 및 CMS로는 가입이 불가하며, 타인의 신용카드 및 CMS 무단 사용 시 여신전문금융법, 신용카드 부정사용죄, 사기죄, 점유 이탈물 횡령죄 등에 해당하고 7년 이하의 징역 이나 5천만원 이하의 벌금형에 처할 수 있습니다."
        }
    };
    var FOOT = {
        s0: "상품 제공 (주)소노스테이션 · 가입센터 (주)비즈이노",
        s1: "상품 제공 (주)소노스테이션 · 가입센터 (주)비즈이노"
    };
    var PAYDAY = 10, WHO = [], idx = 0, PAYM = "card";
    var SOBOK_LIB = {
        1: "01_A_sobok_front_400.png",
        2: "02_A_sobok_front_800.png",
        3: "03_A_sobok_arm_173.png",
        4: "04_B_sobok_mum_1122.png",
        5: "05_B_sobok_mum_281.png",
        6: "06_B_sobok_side_222.png",
        7: "07_B_sobok_bow_382.png",
        8: "08_B_sobok_bow_764.png",
        9: "09_B_sobok_umbrella_1080.png",
        10: "10_B_sobok_umbrella_270.png",
        11: "11_sobok_megaphone.png",
        12: "12_sobok_alpha.png",
        13: "13_soboki_point_alpha.png",
        14: "14_soboki_thumb_alpha.png",
        15: "15_soboki_wave_alpha.png",
        16: "16_sobok_back.png",
        17: "17_sobok_banknote.png",
        18: "18_sobok_benefits.png",
        19: "19_sobok_closer.png",
        20: "20_sobok_form.png",
        21: "21_sobok_pc_logo.png",
        22: "22_sobok_point_t.png",
        23: "23_sobok_success.png",
        24: "24_sobok_think_t.png"
    };
    var SOBOK_POSES = [ 1, 4, 7, 11, 16, 17, 19, 20, 23 ];
    var SOBOK_DIR = "assets/sobok/";
    var poseIdx = 0;
    function preload(i) {
        var im = new Image;
        im.src = SOBOK_DIR + SOBOK_LIB[SOBOK_POSES[(i + SOBOK_POSES.length) % SOBOK_POSES.length]];
    }
    preload(1);
    preload(2);
    var SOBOK_HEAD = "assets/sobok/25_sobok_headset.png?v=50";
    function setPose(i) {
        poseIdx = (i + SOBOK_POSES.length) % SOBOK_POSES.length;
        if (ORDER[idx] === "s5") {
            $("#sobokImg").src = SOBOK_DIR + SOBOK_LIB[SOBOK_POSES[poseIdx]];
        }
        preload(poseIdx + 1);
    }
    var SOBOK = {
        s0: "막히면 제가 도와드릴게요.",
        s1: "이름부터 같이 입력해요.",
        s2: "구좌만 고르면 돼요.",
        s3: "주소만 검색하면 돼요.",
        s4: "결제수단만 등록하면 돼요.",
        s5: "끝까지 함께해서 기뻐요!"
    };
    var FOCUS = {
        iPhone: "인증 문자를 받을 번호예요.",
        iName: "신분증과 같은 이름으로요.",
        iBirth: "앞 6자리만요. 예) 600315",
        fAddr2: "동·호수까지 적어주세요.",
        fMailId: "없으면 비워 두셔도 돼요.",
        fCard: "카드번호는 암호화돼요.",
        fExp: "카드 앞면 MM/YY예요.",
        fAcct: "본인 명의 계좌를 입력해 주세요."
    };
    var LOADTX = {
        s1: "인증을 준비하고 있어요",
        s2: "정보를 확인하고 있어요",
        s3: "가입정보를 확인하고 있어요",
        s4: "결제 화면을 준비하고 있어요",
        s5: "가입 정보를 등록하고 있어요"
    };
    var bub = $("#sobokBub"), bubTx = $("#sobokTx"), bubT = null;
    function fitBub() {
        try {
            var pr = $("#pg").getBoundingClientRect(), tt = $("#pg .tot").getBoundingClientRect(), r = parseFloat(getComputedStyle(bub).right) || 0;
            var w = Math.floor(pr.right - r - (tt.right + 8));
            bub.style.maxWidth = Math.max(80, Math.min(220, w)) + "px";
        } catch (e) {}
    }
    window.addEventListener("resize", function() {
        fitBub();
    });
    function say(t, hold) {
        if (!t) return;
        bubTx.textContent = t;
        fitBub();
        bub.classList.add("show");
        clearTimeout(bubT);
        bubT = setTimeout(function() {
            bub.classList.remove("show");
        }, hold || 4200);
    }
    var sb = $("#sobokBtn"), pressT = null, pressed = false, longFired = false, idleT = null;
    function sbAnim(cls, ms) {
        sb.classList.remove("wig", "react", "land");
        void sb.offsetWidth;
        sb.classList.add(cls);
        if (ms) setTimeout(function() {
            sb.classList.remove(cls);
        }, ms);
    }
    sb.addEventListener("click", function() {
        if (longFired) {
            longFired = false;
            return;
        }
        sbAnim("react", 200);
        openHelp();
    });
    sb.addEventListener("pointerdown", function() {
        pressed = true;
        longFired = false;
        clearTimeout(pressT);
        pressT = setTimeout(function() {
            if (pressed) {
                longFired = true;
                sb.classList.remove("wig", "react", "land");
                sb.classList.add("shake");
            }
        }, 300);
    });
    function endPress() {
        if (!pressed) return;
        pressed = false;
        clearTimeout(pressT);
        if (sb.classList.contains("shake")) {
            sb.classList.remove("shake");
            sbAnim("land", 200);
            say(SOBOK[ORDER[idx]], 4e3);
        }
    }
    [ "pointerup", "pointercancel", "pointerleave" ].forEach(function(ev) {
        sb.addEventListener(ev, endPress);
    });
    sb.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
    function idleTick() {
        idleT = setTimeout(function() {
            if (!pressed && !document.hidden && !sb.classList.contains("shake")) {
                sbAnim("wig", 950);
            }
            idleTick();
        }, 3e3 + Math.random() * 2e3);
    }
    idleTick();
    var load = $("#load");
    function showLoad(msg, ms, cb) {
        $("#loadTx").innerHTML = "잠시만 기다려 주세요<span>" + (msg || "정보를 확인하고 있어요") + "</span>";
        load.classList.add("on");
        setTimeout(function() {
            load.classList.remove("on");
            cb && cb();
        }, ms || 800);
    }
    function paintPg() {
        var id = ORDER[idx], p = PG[id], done = id === "s5";
        $("#pg").classList.toggle("done", done);
        $("#pgNum").firstChild.nodeValue = done ? "" : String(p + 1);
        $("#pgLab").textContent = done ? "가입 완료" : PGN[p];
        if (MODE === "A" && id === "s0") {
            $("#pgNum").firstChild.nodeValue = "2";
            $("#pgLab").textContent = PGN[PG["s2"]];
            $$("#pgDots i").forEach(function(el, i) {
                el.className = i < PG["s2"] ? "done" : "";
            });
        }
        $$("#pgDots i").forEach(function(el, i) {
            el.className = done || i < p ? "done" : "";
        });
    }
    function fitMemb() {
        var p = $("#membTx");
        p.style.fontSize = "";
    }
    window.addEventListener("resize", function() {
        if (ORDER[idx] === "s5") fitMemb();
    });
    function fitStep() {
        var m = $("#main"), sec = $(".scr.on");
        if (!sec) return;
        sec.style.zoom = "";
        var pb = parseFloat(getComputedStyle(m).paddingBottom) || 0, mb = m.getBoundingClientRect(), sb = sec.getBoundingClientRect();
        var need = Math.max(m.scrollHeight - m.clientHeight, sb.bottom + m.scrollTop - mb.top + pb - m.clientHeight);
        if (need > 0 && window.innerHeight < 500) {
            var avail = m.clientHeight - pb - (sb.top + m.scrollTop - mb.top), z = Math.max(.8, Math.min(1, (avail - 2) / sb.height));
            sec.style.zoom = z.toFixed(3);
        }
    }
    window.addEventListener("resize", function() {
        fitStep();
    });
    function render() {
        var id = ORDER[idx];
        $$(".scr").forEach(function(s) {
            s.classList.toggle("on", s.id === id);
        });
        $("#main").scrollTop = 0;
        var fn = FOOT[id];
        $("#fnote").hidden = !fn;
        if (fn) $("#fnote").textContent = fn;
        $("#app").classList.toggle("nofoot", !fn);
        if (id === "s1") {
            var c1 = s1Cur();
            if (c1 >= 0) {
                $(SEQ[c1].fd).classList.add("act");
            }
            paintS1();
        }
        if (id === "s5") {
            setPose(1);
            requestAnimationFrame(fitMemb);
        } else {
            $("#sobokImg").src = SOBOK_HEAD;
        }
        paintPg();
        TRACK("direct_step", {
            step: id,
            seats: SEATS
        });
        if (id === "s5") {
            TRACK("complete", {
                seats: SEATS
            });
            Promise.resolve(H.onComplete(STATE())).catch(function() {});
        }
        if (id !== "s2") benOpen(false);
        syncCta();
        requestAnimationFrame(fitStep);
        setTimeout(fitStep, 350);
        setTimeout(function() {
            say(SOBOK[id]);
        }, 380);
    }
    function go(n) {
        if (n < 0 || n >= ORDER.length) return;
        var to = ORDER[n];
        showLoad(LOADTX[to] || "정보를 확인하고 있어요", 780, function() {
            idx = n;
            render();
        });
    }
    var cta = $("#mainCta"), subCta = $("#subCta");
    function ctaLabel(id) {
        if (id === "s0") return MODE === "A" ? "구좌 선택하기" : "시작하기";
        if (id === "s1") return s1Cur() < 0 ? "토스로 인증하기" : "다음";
        if (id === "s2") return SEATS + "구좌로 준비할게요";
        if (id === "s3") return "결제 정보 등록하기";
        if (id === "s4") return "계약서 확인하러 가기";
        return "소노아임레디 멤버십 열기";
    }
    function valid(id) {
        if (id === "s1") {
            var c = s1Cur();
            if ($("#stack .pf.err")) return false;
            return c < 0 ? true : SEQ[c].ok($(SEQ[c].inp).value);
        }
        if (id === "s4") return $("#ck4").classList.contains("on") && (PAYM !== "cms" || $("#ckCms").classList.contains("on"));
        return true;
    }
    function syncCta() {
        var id = ORDER[idx];
        cta.textContent = ctaLabel(id);
        cta.disabled = !valid(id);
        subCta.hidden = id === "s5" || id === "s0";
    }
    cta.addEventListener("click", function() {
        var id = ORDER[idx];
        if (!valid(id)) return;
        if (id === "s0") {
            idx = idx + 1;
            render();
            if (MODE === "B") $("#iName").focus();
            return;
        }
        if (id === "s1") {
            var c = s1Cur();
            if (c >= 0) {
                stepDone(c);
                return;
            }
            applyAuthName();
            prefillTermsFromLanding();
            openDim("#termsDim");
            return;
        }
        if (id === "s2") TRACK("addToCart", {
            seats: SEATS
        });
        if (id === "s4") {
            TRACK("initiateCheckout", {
                seats: SEATS,
                payMethod: PAYM
            });
            var ps = STATE({
                payDay: typeof PAYDAY !== "undefined" ? PAYDAY : null,
                bank: PAYM === "cms" ? $("#fBank").value : ""
            });
            cta.disabled = true;
            Promise.resolve(H.registerPayment(ps)).then(function(r) {
                if (r && r.ok === false) {
                    say(r && r.message || "결제 등록을 다시 시도해 주세요.");
                    syncCta();
                    return null;
                }
                return H.startSign(ps);
            }).then(function(r) {
                if (r === null) return;
                if (r && r.ok === false) {
                    say(r && r.message || "서명을 다시 시도해 주세요.");
                    syncCta();
                    return;
                }
                go(idx + 1);
            });
            return;
        }
        if (id === "s3") {
            mailNoneIfBlank();
        }
        if (id === "s5") {
            say("1회차 결제 후 쓸 수 있어요.", 5e3);
            return;
        }
        go(idx + 1);
    });
    subCta.addEventListener("click", function() {
        openDim("#telDim");
    });
    $("#ck4").addEventListener("click", function() {
        this.classList.toggle("on");
        syncCta();
    });
    function bindAcc(btn, body) {
        btn.addEventListener("click", function() {
            var open = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", String(!open));
            body.style.maxHeight = open ? "0px" : body.scrollHeight + 24 + "px";
        });
    }
    var INHERIT_LP_AGREE = true;
    var LP_AGREE_NOTE = "랜딩에서 동의하신 필수 항목이에요. 확인하고 진행해 주세요.";
    function prefillTermsFromLanding() {
        if (!LP_FLOW || prefillTermsFromLanding.done) return;
        prefillTermsFromLanding.done = true;
        var box = $("#termsDim .tlist");
        if (box && !$("#lpAgreeNote")) {
            var n = document.createElement("p");
            n.id = "lpAgreeNote";
            n.className = "lpnote";
            n.textContent = "가입 신청을 위해 약관을 한 번 더 확인해 주세요.";
            box.parentNode.insertBefore(n, box);
        }
        var PREFILL_REQUIRED = false;
        var SAME_ITEMS = !!(CTX.lpAgree && CTX.lpAgree.src === "query");
        if (SAME_ITEMS && INHERIT_LP_AGREE) {
            $$(".chk.tm[data-req]").forEach(function(c) {
                c.classList.add("on");
            });
            var nn = $("#lpAgreeNote");
            if (nn) nn.textContent = LP_AGREE_NOTE;
            syncTerms();
            return;
        }
        if (PREFILL_REQUIRED && CTX.lpAgree) {
            $$(".chk.tm[data-req]").forEach(function(c) {
                c.classList.add("on");
            });
            var h = $("#termsDim .th h3");
            if (h) h.textContent = "약관을 확인하고 동의해 주세요";
            syncTerms();
        }
    }
    function syncTerms() {
        var all = $$(".chk.tm").every(function(c) {
            return c.classList.contains("on");
        });
        var req = $$(".chk.tm[data-req]").every(function(c) {
            return c.classList.contains("on");
        });
        $("#ckAll").classList.toggle("on", all);
        $("#termsOk").disabled = !req;
    }
    function lawHtml(t) {
        return t.split(/\n\s*\n/).map(function(c) {
            c = c.trim();
            var m = c.match(/^(\d+\.)\s*(.*)$/s);
            return m ? "<p><b>" + m[1] + "</b>" + m[2] + "</p>" : "<p>" + c + "</p>";
        }).join("");
    }
    function openTerm(n) {
        $("#t2Title").textContent = TERMS[n].t;
        $("#t2Body").innerHTML = n === 3 ? lawHtml(TERMS[n].b) : TERMS[n].b;
        $("#t2Body").classList.toggle("law", n === 3);
        $("#t2Sub").hidden = n !== 3;
        $("#t2Body").scrollTop = 0;
        openDim("#termDim2");
    }
    $$(".tview").forEach(function(b) {
        b.addEventListener("click", function() {
            openTerm(+b.dataset.term);
        });
    });
    $("#t2X").addEventListener("click", function() {
        closeDim("#termDim2");
    });
    $("#t2Ok").addEventListener("click", function() {
        closeDim("#termDim2");
    });
    $("#ckAll").addEventListener("click", function() {
        var on = !this.classList.contains("on");
        $$(".chk.tm").forEach(function(c) {
            c.classList.toggle("on", on);
        });
        syncTerms();
    });
    $$(".chk.tm").forEach(function(c) {
        c.addEventListener("click", function() {
            c.classList.toggle("on");
            syncTerms();
        });
    });
    $("#termsOk").addEventListener("click", function() {
        TRACK("lead", {
            trigger: "terms_agree"
        });
        closeDim("#termsDim");
        $("#tPhone").value = AUTH.phone;
        $("#tName").value = NAME || "김소노";
        $("#tBirth").value = AUTH.birth;
        $("#tossTitle").classList.add("on");
    });
    $("#termsX").addEventListener("click", function() {
        closeDim("#termsDim");
    });
    $("#tlistTg").addEventListener("click", function() {
        var o = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", String(!o));
        $("#tlist").hidden = o;
    });
    $("#tossTitleX").addEventListener("click", function() {
        $("#tossTitle").classList.remove("on");
        say("언제든 다시 요청할 수 있어요.");
    });
    var SEQ = [ {
        fd: "#fdName",
        inp: "#iName",
        ex: "김소노",
        ok: function(v) {
            return v.trim().length >= 2;
        }
    }, {
        fd: "#fdBirth",
        inp: "#iBirth",
        ex: "600315",
        ok: function(v) {
            return birthOk(v);
        }
    }, {
        fd: "#fdPhone",
        inp: "#iPhone",
        ex: "010-1234-1234",
        ok: function(v) {
            return phoneOk(v);
        }
    } ];
    function birthOk(v) {
        var d = v.replace(/\D/g, "");
        if (d.length !== 6) return false;
        var m = +d.slice(2, 4), dd = +d.slice(4, 6);
        return m >= 1 && m <= 12 && dd >= 1 && dd <= 31;
    }
    function phoneOk(v) {
        var d = v.replace(/\D/g, "");
        return d.slice(0, 3) === "010" && (d.length === 10 || d.length === 11);
    }
    function markErr(fd, bad) {
        $(fd).classList.toggle("err", !!bad);
        syncCta();
    }
    $("#iPhone").addEventListener("blur", function() {
        var d = this.value.replace(/\D/g, "");
        if (this.classList.contains("pre")) return;
        markErr("#fdPhone", d.length > 0 && !phoneOk(this.value));
    });
    function fmtPhone(v) {
        v = v.replace(/\D/g, "").slice(0, 11);
        return v.length > 7 ? v.replace(/(\d{3})(\d{3,4})(\d{1,4})/, "$1-$2-$3") : v.length > 3 ? v.replace(/(\d{3})(\d+)/, "$1-$2") : v;
    }
    var S1T = {
        0: "<b>본인확인</b>을 위해<br><b>이름</b>을 입력해주세요",
        1: "<b>생년월일 앞 6자리</b>를<br>입력해주세요",
        2: "<b>휴대폰번호</b>를 입력해주세요"
    };
    function s1Cur() {
        for (var i = 0; i < SEQ.length; i++) {
            if (!$(SEQ[i].fd).classList.contains("done")) return i;
        }
        return -1;
    }
    function paintS1() {
        var c = s1Cur();
        $("#s1t").innerHTML = S1T[c < 0 ? 2 : c];
    }
    function stepDone(i) {
        var s = SEQ[i], el = $(s.inp);
        if (!el.value.trim()) el.value = s.ex;
        if (s.inp === "#iPhone") el.value = fmtPhone(el.value);
        if (!s.ok(el.value)) {
            markErr(s.fd, true);
            el.focus();
            say("한 번 더 확인해 주세요.");
            return;
        }
        markErr(s.fd, false);
        $(s.fd).classList.add("done");
        $(s.fd).classList.remove("act");
        var n = SEQ[i + 1];
        if (n) {
            var fd = $(n.fd);
            fd.hidden = false;
            fd.classList.add("fill", "act");
            $(n.inp).focus();
            say(FOCUS[n.inp.slice(1)]);
        } else {
            el.blur();
        }
        paintS1();
        syncCta();
        requestAnimationFrame(fitStep);
    }
    $$(".fok").forEach(function(b) {
        b.addEventListener("click", function() {
            var id = "#" + b.dataset.f, i = SEQ.map(function(s) {
                return s.inp;
            }).indexOf(id);
            if (i >= 0) stepDone(i);
        });
    });
    SEQ.forEach(function(s, i) {
        var el = $(s.inp);
        el.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                stepDone(i);
            }
        });
        el.addEventListener("focus", function() {
            if (!$(s.fd).classList.contains("done")) $(s.fd).classList.add("act");
        });
    });
    function clearPre(el) {
        if (el.classList.contains("pre")) {
            el.value = "";
            el.classList.remove("pre");
        }
    }
    $("#iPhone").addEventListener("beforeinput", function(e) {
        if (e.inputType && e.inputType.indexOf("insert") === 0) clearPre(this);
    });
    $("#iPhone").addEventListener("keydown", function(e) {
        if (e.key && e.key.length === 1) clearPre(this);
    });
    $("#iPhone").addEventListener("paste", function() {
        clearPre(this);
    });
    $("#iPhone").addEventListener("input", function() {
        this.classList.remove("pre");
        this.value = fmtPhone(this.value);
        var d = this.value.replace(/\D/g, "");
        markErr("#fdPhone", d.length >= 3 && d.slice(0, 3) !== "010" || d.length > 11);
        if (d.length === 11 && phoneOk(this.value) && !$("#fdPhone").classList.contains("done")) stepDone(2);
    });
    $("#iBirth").addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 6);
        markErr("#fdBirth", this.value.length === 6 && !birthOk(this.value));
        if (this.value.length === 6 && birthOk(this.value) && !$("#fdBirth").classList.contains("done")) stepDone(1);
    });
    var AUTH = {
        birth: "1960.03.15",
        phone: "010-1234-1234"
    };
    function applyAuthName() {
        var n = $("#iName").value.trim();
        if (n) NAME = n;
        var b = $("#iBirth").value.replace(/\D/g, ""), p = $("#iPhone").value;
        if (b.length === 6) {
            var yy = +b.slice(0, 2), cur = (new Date).getFullYear() % 100;
            AUTH.birth = (yy > cur ? 1900 : 2e3) + yy + "." + b.slice(2, 4) + "." + b.slice(4, 6);
        }
        if (p) AUTH.phone = p;
        paintName();
    }
    $("#tossReq").addEventListener("click", function() {
        Promise.resolve(H.requestAuth(STATE({
            birth: AUTH.birth,
            phone: AUTH.phone
        }))).then(function(r) {
            if (r && r.skipWait && r.ok) {
                $("#tossTitle").classList.remove("on");
                $("#tossFull").classList.add("on");
            } else openDim("#tossDim");
        });
    });
    $("#tossAgain").addEventListener("click", function() {
        say("인증을 다시 요청했어요.");
    });
    $("#tossOk").addEventListener("click", function() {
        closeDim("#tossDim");
        showLoad("인증 결과를 확인하고 있어요", 700, function() {
            Promise.resolve(H.confirmAuth(STATE({
                birth: AUTH.birth,
                phone: AUTH.phone
            }))).then(function(r) {
                if (r && r.ok === false) {
                    say(r && r.message || "인증을 다시 확인해 주세요.");
                    openDim("#tossDim");
                    return;
                }
                if (r && r.name) {
                    NAME = r.name;
                    paintName();
                }
                $("#tossTitle").classList.remove("on");
                $("#tossFull").classList.add("on");
            });
        });
    });
    $("#tossClose").addEventListener("click", function() {
        AUTHED = true;
        TRACK("auth_done", {});
        $("#tossFull").classList.remove("on");
        go(idx + 1);
    });
    function paintName() {
        var nm = (NAME || "고객") + "님";
        $("#benefitName").textContent = nm + "이 누릴 수 있는 혜택을 찾았어요";
        $("#v3name").textContent = nm;
        $("#v3sub").textContent = AUTH.birth + " · " + AUTH.phone;
    }
    function paintSeats() {
        $$("#seats .seat").forEach(function(b) {
            b.classList.toggle("on", +b.dataset.n === SEATS);
        });
        $("#m1").innerHTML = won(SEATS * 1e3) + "<u>원</u>";
        $("#m2").textContent = "13개월차부터 월 " + won(SEATS * 19e3) + "원";
        $("#m4").innerHTML = won(SEATS * 616e3) + "<u>원</u>";
        $(".pill .l").innerHTML = '<b id="p4seat">' + SEATS + "구좌 · 첫 12개월</b>13개월차부터 월 " + won(SEATS * 19e3) + "원";
        $("#p4amt").innerHTML = "월 " + won(SEATS * 1e3) + "<u>원</u>";
        $("#d2").textContent = SEATS + "구좌";
        $("#d3").innerHTML = "월 " + won(SEATS * 1e3) + "<u>원</u>";
        $("#payAmt").textContent = won(SEATS * 1e3);
        syncCta();
    }
    $("#seats").addEventListener("click", function(e) {
        var b = e.target.closest(".seat");
        if (!b) return;
        SEATS = +b.dataset.n;
        paintSeats();
        say(SEATS === 1 ? "1구좌로 계산해 뒀어요." : SEATS === 2 ? "부부·부모님까지 같이 준비해요." : "토스회원은 여기까지, 3구좌예요.");
    });
    $("#who").addEventListener("click", function(e) {
        var b = e.target.closest(".av");
        if (!b) return;
        b.classList.toggle("on");
        WHO = $$("#who .av.on").map(function(c) {
            return c.dataset.w;
        });
        if (WHO.length > SEATS && SEATS < 3) {
            SEATS = Math.min(3, WHO.length);
            paintSeats();
            say(SEATS + "구좌로 맞춰 뒀어요.");
        }
    });
    function benOpen(on) {
        $("#benBtn").setAttribute("aria-expanded", String(on));
        if (on) {
            openDim("#benDim");
            $("#benDim .bsb").scrollTop = 0;
        } else {
            closeDim("#benDim");
        }
    }
    $("#benBtn").addEventListener("click", function() {
        benOpen(true);
    });
    $("#benOk").addEventListener("click", function() {
        benOpen(false);
    });
    $("#zipBtn").addEventListener("click", function() {
        Promise.resolve(H.searchAddress(STATE())).then(function(r) {
            if (!r) return;
            $("#fZip").value = r.zip || "";
            $("#fAddr1").value = r.addr1 || "";
            $("#fAddr2").focus();
            say("주소를 넣었어요. 상세주소만 입력해 주세요.");
        });
    });
    function paintMail() {
        var none = $("#fMailDom").value === "none", id = $("#fMailId");
        id.disabled = none;
        if (none) {
            id.value = "";
            id.placeholder = "없음";
        } else {
            id.placeholder = "아이디";
        }
        if (none) say("이메일 없음 · 계약서는 알림톡으로 보내드려요.", 5e3);
    }
    function setMailDom(v) {
        $("#fMailDom").value = v;
        var lbl = {
            naver: "naver.com",
            "naver.com": "naver.com",
            "gmail.com": "gmail.com",
            "daum.net": "daum.net",
            "nate.com": "nate.com",
            none: "없음"
        }[v] || "선택";
        $("#fMailLbl").textContent = lbl;
        $("#fMailBtn").classList.toggle("ph", !v);
        $$("#mailOpts button").forEach(function(b) {
            b.classList.toggle("on", b.dataset.v === v);
        });
        paintMail();
    }
    $("#fMailBtn").addEventListener("click", function() {
        $("#fMailId").blur();
        openDim("#mailDim");
    });
    $$("#mailOpts button").forEach(function(b) {
        b.addEventListener("click", function() {
            setMailDom(b.dataset.v);
            closeDim("#mailDim");
        });
    });
    $("#mailDim").addEventListener("click", function(e) {
        if (e.target === this) closeDim("#mailDim");
    });
    function mailNoneIfBlank() {
        if (!$("#fMailId").value.trim() || !$("#fMailDom").value) {
            setMailDom("none");
        }
    }
    $("#fCard").addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    });
    $("#fExp").addEventListener("input", function() {
        var v = this.value.replace(/\D/g, "").slice(0, 4);
        this.value = v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v;
    });
    var WHO_MAP = {
        me: "본인",
        parent: "부모님",
        spouse: "배우자"
    };
    (function() {
        var w = WHO_MAP[CTX.who];
        if (!w) return;
        var c = $('#who .av[data-w="' + w + '"]');
        if (c) {
            c.classList.add("on");
            WHO = [ w ];
        }
    })();
    var HC_NOTE = {
        cms: "계좌 자동이체로 가입하면 소노아임레디에서 가입 확인 전화(해피콜)를 드려요.",
        card: "가입 후 소노아임레디에서 가입 확인 연락을 드릴 수 있어요."
    };
    function setPayMethod(m) {
        PAYM = m === "cms" ? "cms" : "card";
        $$("#pm button").forEach(function(b) {
            var on = b.dataset.m === PAYM;
            b.classList.toggle("on", on);
            b.setAttribute("aria-pressed", String(on));
        });
        $("#s4").classList.toggle("cms", PAYM === "cms");
        $("#pmCard").hidden = PAYM !== "card";
        $("#pmCms").hidden = PAYM !== "cms";
        $("#ckCmsRow").hidden = PAYM !== "cms";
        $("#hcNote").textContent = PAYM === "cms" ? HC_NOTE.cms : HC_NOTE.card;
        syncCta();
    }
    $("#pm").addEventListener("click", function(e) {
        var b = e.target.closest("button");
        if (b) setPayMethod(b.dataset.m);
    });
    $("#ckCms").addEventListener("click", function() {
        this.classList.toggle("on");
        syncCta();
    });
    (function() {
        var ms = H.payMethods && H.payMethods() || [ "card" ];
        if (ms.indexOf("cms") < 0) {
            $("#pm").hidden = true;
        }
        setPayMethod("card");
    })();
    $("#fAcct").addEventListener("input", function() {
        this.value = this.value.replace(/[^\d-]/g, "").slice(0, 20);
    });
    $("#days").addEventListener("click", function(e) {
        var b = e.target.closest(".day");
        if (!b) return;
        $$("#days .day").forEach(function(d) {
            d.classList.remove("on");
        });
        b.classList.add("on");
        PAYDAY = +b.dataset.d;
        $("#d4").textContent = "다음 " + PAYDAY + "일";
    });
    function openDim(sel) {
        $(sel).classList.add("on");
    }
    function closeDim(sel) {
        $(sel).classList.remove("on");
        if (sel === "#benDim") $("#benBtn").setAttribute("aria-expanded", "false");
    }
    (function() {
        if (MODE !== "A") return;
        var s0 = $("#s0");
        if (!s0) return;
        var t = s0.querySelector("h1.t");
        if (t) t.innerHTML = '토스인증이 완료됐어요<br><span class="b">구좌 선택</span>부터 이어서 진행해요';
        var li = s0.querySelectorAll(".flow li");
        if (li[0]) {
            li[0].className = "done";
            var b = li[0].querySelector("b"), pp = li[0].querySelector("p");
            if (b) b.textContent = "본인 인증 완료";
            if (pp) pp.textContent = (NAME ? NAME + "님, " : "") + "토스 인증이 확인됐어요";
        }
        if (li[1]) li[1].className = "cur";
        SOBOK.s0 = "인증 끝! 구좌만 고르면 돼요.";
    })();
    var LEAVING = false;
    var AUTHED = MODE === "A";
    function openExit() {
        if (LEAVING) return;
        $("#exitPre").hidden = AUTHED;
        $("#exitPost").hidden = !AUTHED;
        $("#exitPill").hidden = !AUTHED;
        openDim("#exitDim");
    }
    $("#exitNo").addEventListener("click", function() {
        closeDim("#exitDim");
        say("좋아요, 이어서 해요.");
    });
    $("#exitYes").addEventListener("click", function() {
        closeDim("#exitDim");
        openDim("#telDim");
    });
    $("#telStay").addEventListener("click", function() {
        closeDim("#telDim");
        say("화면으로 도와드릴게요.");
    });
    $("#telLeave").addEventListener("click", function() {
        LEAVING = true;
        closeDim("#telDim");
        var r = document.referrer;
        if (r && r.indexOf(location.origin) === 0 && r.indexOf("/direct") < 0) {
            location.href = r;
            return;
        }
        history.go(-2);
    });
    $$(".dim").forEach(function(d) {
        d.addEventListener("click", function(e) {
            if (e.target === d) closeDim("#" + d.id);
        });
    });
    $("#btnBack").addEventListener("click", function() {
        if (idx === 0) {
            openExit();
            return;
        }
        idx--;
        render();
    });
    history.pushState({
        sl: 1
    }, "", location.href);
    window.addEventListener("popstate", function() {
        history.pushState({
            sl: 1
        }, "", location.href);
        openExit();
    });
    var leftOnce = false;
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "hidden" && !leftOnce && ORDER[idx] !== "s5") {
            leftOnce = true;
            openExit();
        }
    });
    $$("input,select").forEach(function(el) {
        el.addEventListener("focus", function() {
            if (FOCUS[el.id]) say(FOCUS[el.id]);
        });
        el.addEventListener("input", syncCta);
    });
    var FQ = window.SL_FAQ;
    if (!FQ || !FQ.sections) throw new Error("direct.faq.js must be loaded before direct.core.js");
    var SECS = FQ.sections.filter(function(s) {
        return s && s.items && s.items.length;
    });
    var HELP_AGENT = FQ.agent || "", HELP_MISS = FQ.miss || "";
    var FLAT = [];
    SECS.forEach(function(s, si) {
        s.items.forEach(function(it) {
            FLAT.push({
                s: si,
                c: it.chip || it.q,
                q: it.q || it.chip,
                a: it.a || "",
                keys: it.keys || []
            });
        });
    });
    var chipsEl = $("#helpChips"), curSec = 0;
    var tabsEl = document.createElement("div");
    tabsEl.className = "htabs";
    tabsEl.id = "helpTabs";
    tabsEl.setAttribute("role", "tablist");
    chipsEl.parentNode.insertBefore(tabsEl, chipsEl);
    SECS.forEach(function(s, si) {
        var t = document.createElement("button");
        t.type = "button";
        t.setAttribute("role", "tab");
        t.dataset.s = si;
        t.textContent = s.tab || s.title;
        tabsEl.appendChild(t);
    });
    tabsEl.hidden = SECS.length < 2;
    $("#helpFull").classList.toggle("tabs", SECS.length >= 2);
    function renderChips(si) {
        curSec = si;
        chipsEl.innerHTML = "";
        $$("#helpTabs button").forEach(function(t) {
            var on = +t.dataset.s === si;
            t.classList.toggle("on", on);
            t.setAttribute("aria-selected", on ? "true" : "false");
        });
        FLAT.forEach(function(f, fi) {
            if (f.s !== si) return;
            var b = document.createElement("button");
            b.type = "button";
            b.textContent = f.c;
            b.dataset.f = fi;
            chipsEl.appendChild(b);
        });
    }
    renderChips(0);
    tabsEl.addEventListener("click", function(e) {
        var t = e.target.closest("button");
        if (!t) return;
        renderChips(+t.dataset.s);
        $("#helpAns").hidden = true;
        $("#helpCallBtn").hidden = true;
    });
    function mkHtml(t) {
        var e = String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        e = e.replace(/\[\[([\s\S]+?)\]\]/g, '<b class="mkb">$1</b>').replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>");
        var o = "", ul = false;
        e.split("\n").forEach(function(l) {
            if (l.indexOf("• ") === 0) {
                if (!ul) {
                    o += '<ul class="mkl">';
                    ul = true;
                }
                o += "<li>" + l.slice(2) + "</li>";
            } else {
                if (ul) {
                    o += "</ul>";
                    ul = false;
                }
                if (l.replace(/\s/g, "")) o += "<p>" + l + "</p>";
            }
        });
        if (ul) o += "</ul>";
        return o;
    }
    function helpShow(q, a, call, fi) {
        if (fi != null && fi >= 0 && FLAT[fi] && FLAT[fi].s !== curSec) renderChips(FLAT[fi].s);
        $$("#helpChips button").forEach(function(x) {
            x.classList.toggle("on", +x.dataset.f === fi);
        });
        $("#helpQ").textContent = q;
        $("#helpAnsTx").innerHTML = mkHtml(a);
        $("#helpCallBtn").hidden = !call;
        $("#helpAns").hidden = false;
        $("#helpBody").scrollTop = 0;
    }
    chipsEl.addEventListener("click", function(e) {
        var b = e.target.closest("button");
        if (!b) return;
        var fi = +b.dataset.f, f = FLAT[fi];
        helpShow(f.q, f.a, false, fi);
    });
    function helpMatch(t) {
        var k = (t || "").replace(/\s+/g, "");
        if (k.indexOf("상담원") >= 0 || k.indexOf("상담사") >= 0) return {
            a: HELP_AGENT,
            call: true,
            i: -1
        };
        for (var fi = 0; fi < FLAT.length; fi++) {
            var w = FLAT[fi].keys;
            for (var m = 0; m < w.length; m++) {
                var kw = String(w[m]).replace(/\s+/g, "");
                if (kw && k.indexOf(kw) >= 0) return {
                    a: FLAT[fi].a,
                    call: false,
                    i: fi
                };
            }
        }
        return {
            a: HELP_MISS,
            call: false,
            i: -1
        };
    }
    function helpAsk(t) {
        t = (t || "").trim();
        if (!t) return;
        Promise.resolve(H.ask ? H.ask(t, {
            match: helpMatch,
            faq: FLAT,
            sections: SECS
        }) : null).then(function(r) {
            r = r || helpMatch(t);
            helpShow(t, r.a, r.call, r.i);
        });
    }
    $("#helpForm").addEventListener("submit", function(e) {
        e.preventDefault();
        var i = $("#helpIn");
        helpAsk(i.value);
        i.value = "";
        $("#helpForm").classList.add("empty");
        i.blur();
    });
    $("#helpIn").addEventListener("input", function() {
        $("#helpForm").classList.toggle("empty", !this.value.trim());
    });
    $("#helpForm").classList.add("empty");
    if (window.visualViewport) {
        var vvFix = function() {
            var hf = $("#helpFull");
            if (!hf.classList.contains("on")) {
                hf.style.bottom = "";
                return;
            }
            var gap = window.innerHeight - (visualViewport.height + visualViewport.offsetTop);
            hf.style.bottom = (gap > 0 ? gap : 0) + "px";
        };
        visualViewport.addEventListener("resize", vvFix);
        visualViewport.addEventListener("scroll", vvFix);
    }
    function openHelp() {
        $("#helpFull").classList.add("on");
        $("#helpBody").scrollTop = 0;
        $("#helpAns").hidden = true;
        $("#helpCallBtn").hidden = true;
        renderChips(0);
    }
    function closeHelp() {
        $("#helpFull").classList.remove("on");
    }
    $("#helpBack").addEventListener("click", closeHelp);
    $("#helpClose").addEventListener("click", closeHelp);
    function promoKey() {
        var d = new Date;
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    var promoT = null;
    function promoShow(force) {
        if (!force) {
            try {
                if (localStorage.getItem("sl420_promo_hide") === promoKey()) return;
            } catch (e) {}
        }
        openDim("#promoDim");
    }
    $("#promoDay").addEventListener("click", function() {
        try {
            localStorage.setItem("sl420_promo_hide", promoKey());
        } catch (e) {}
        closeDim("#promoDim");
    });
    $("#promoX").addEventListener("click", function() {
        closeDim("#promoDim");
    });
    paintName();
    paintSeats();
    render();
    paintS1();
    promoT = setTimeout(function() {
        promoShow(false);
    }, 600);
    window.__qa = {
        goto: function(id) {
            var i = ORDER.indexOf(id);
            if (i >= 0) {
                idx = i;
                render();
            }
        },
        fill1: function() {
            stepDone(0);
            stepDone(1);
            stepDone(2);
        },
        terms: function() {
            openDim("#termsDim");
        },
        toss1: function() {
            $("#termsOk").disabled = false;
            $("#termsOk").click();
        },
        toss2: function() {
            openDim("#tossDim");
        },
        toss3: function() {
            $("#tossTitle").classList.remove("on");
            $("#tossFull").classList.add("on");
        },
        ben: function(on) {
            benOpen(on !== false);
        },
        term: function(n) {
            openTerm(n || 1);
        },
        exit: openExit,
        tel: function() {
            openDim("#telDim");
        },
        load: function(t) {
            $("#loadTx").innerHTML = "잠시만 기다려 주세요<span>" + (t || "정보를 확인하고 있어요") + "</span>";
            $("#load").classList.add("on");
        },
        sobok: function() {
            $("#sobokBtn").click();
        },
        wig: function() {
            sbAnim("wig", 950);
        },
        shake: function(on) {
            sb.classList.toggle("shake", on !== false);
        },
        pose: function() {
            return SOBOK_POSES[poseIdx];
        },
        closeAll: function() {
            clearTimeout(promoT);
            $$(".dim").forEach(function(d) {
                d.classList.remove("on");
            });
            $("#load").classList.remove("on");
            $("#tossFull").classList.remove("on");
            $("#tossTitle").classList.remove("on");
            $("#helpFull").classList.remove("on");
            $("#benBtn").setAttribute("aria-expanded", "false");
        },
        promo: function() {
            clearTimeout(promoT);
            promoShow(true);
        },
        help: function(i) {
            openHelp();
            var f = FLAT[i];
            if (f) {
                renderChips(f.s);
                helpShow(f.q, f.a, false, i);
            }
        },
        tab: function(s) {
            openHelp();
            renderChips(s || 0);
        },
        faq: function() {
            return {
                version: FQ.version,
                sections: SECS.map(function(s) {
                    return s.id + ":" + s.items.length;
                }),
                items: FLAT.length,
                tabs: !tabsEl.hidden
            };
        },
        ask: function(t) {
            openHelp();
            helpAsk(t);
        },
        mailNone: function() {
            this.goto("s3");
            setMailDom("none");
        },
        land: function() {
            setPose(poseIdx + 1);
            sbAnim("land", 200);
        },
        state: function() {
            return {
                mode: MODE,
                name: NAME,
                seats: SEATS,
                step: ORDER[idx],
                payday: PAYDAY,
                who: WHO,
                payMethod: PAYM,
                lp: LP_FLOW,
                pose: SOBOK_POSES[poseIdx]
            };
        }
    };
})();