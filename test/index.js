/* ===== 订购小抄 · 提交逻辑（jQuery，生产级状态机）===== */
$(function () {
  "use strict";

  var API_KEY = "868ffe977d3b445b541e7e28acb51e41";
  var API_URL = "https://apis.tianapi.com/robot/index";
  var TIMEOUT = 15000; // 毫秒，超时视为失败

  var $form = $("#orderForm");
  var $name = $("#nameInput");
  var $nameError = $("#nameError");
  var $btn = $("#orderBtn");
  var $btnText = $btn.find(".btn-text");
  var $result = $("#result");

  // 状态机：idle（待提交）→ loading（提交中）→ done（已提交，锁定）／idle（失败可重试）
  var state = { submitting: false, done: false };

  function nowText() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) +
      " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }

  var ICONS = {
    ok: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    err: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v5M12 16.5v.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/></svg>',
    info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'
  };

  function setResult(type, message) {
    $result.removeClass("ok err info")
      .addClass(type)
      .html((ICONS[type] || ICONS.info) + "<span></span>")
      .find("span").text(message);
    $result.attr("hidden", false);
  }

  function clearResult() {
    $result.attr("hidden", true).removeClass("ok err info").empty();
  }

  function setError(message) {
    $name.attr("aria-invalid", "true");
    $nameError.text(message).attr("hidden", false);
  }

  function clearError() {
    $name.removeAttr("aria-invalid");
    $nameError.attr("hidden", true).text("");
  }

  // 按钮状态切换（禁止重复提交的核心）
  function setButton(mode) {
    $btn.removeClass("loading done");
    if (mode === "loading") {
      $btn.addClass("loading").prop("disabled", true);
      $btnText.text("正在提交…");
    } else if (mode === "done") {
      $btn.addClass("done").prop("disabled", true);
      $btnText.text("已提交");
    } else {
      $btn.prop("disabled", false);
      $btnText.text("立即订购");
    }
  }

  function validate() {
    var name = $.trim($name.val());
    if (!name) {
      setError("请先输入您的姓名。");
      $name.trigger("focus");
      return null;
    }
    clearError();
    return name;
  }

  function successText(res) {
    if (res && res.code === 200 && res.result && res.result.text) {
      return res.result.text;
    }
    if (res && res.msg) {
      return res.msg;
    }
    return "已提交，请留意后续通知。";
  }

  function failureText(status) {
    if (status === "timeout") {
      return "提交超时，请检查网络后重试。";
    }
    if (status === "error" || status === "parsererror") {
      return "提交失败，请稍后重试。";
    }
    return "提交失败，请稍后重试。";
  }

  function submitOrder(e) {
    e.preventDefault();

    // 提交中或已成功，均拒绝再次提交
    if (state.submitting || state.done) {
      return;
    }

    var name = validate();
    if (!name) {
      return;
    }

    state.submitting = true;
    clearResult();
    setButton("loading");
    $name.prop("readonly", true); // 提交期间锁定输入，防修改后重复提交

    var question = "订购小抄，用户称呼：" + name + "，购买时间：" + nowText();

    $.ajax({
      url: API_URL,
      method: "POST",
      dataType: "json",
      timeout: TIMEOUT,
      data: { key: API_KEY, question: question }
    })
      .done(function (res) {
        state.submitting = false;
        state.done = true;
        setButton("done");
        $name.prop("disabled", true).prop("readonly", true);
        setResult("ok", successText(res));
      })
      .fail(function (xhr, status) {
        // 失败不锁定，允许重试
        state.submitting = false;
        setButton("idle");
        $name.prop("readonly", false).prop("disabled", false);
        setResult("err", failureText(status));
      });
  }

  $form.on("submit", submitOrder);

  // 输入时清空错误提示（仅在未成功锁定时生效）
  $name.on("input", function () {
    if (state.done) {
      return;
    }
    if ($nameError.attr("hidden") === undefined || !$nameError.attr("hidden")) {
      clearError();
    }
  });

  // 焦点重新进入时清空错误提示
  $name.on("focus", clearError);
});
