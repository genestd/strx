"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// app/routes/utils.js
var require_utils = __commonJS({
  "app/routes/utils.js"(exports, module2) {
    "use strict";
    var { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } = require("amazon-cognito-identity-js");
    function login2(email, password) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), userData = {
          Username: email,
          Pool: userPool
        }, cognitoUser = new CognitoUser(userData), authenticationData = {
          Username: email,
          Password: password
        }, authenticationDetails = new AuthenticationDetails(authenticationData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            return resolve(result);
          },
          onFailure: function(err) {
            return err.code === "UserNotConfirmedException" ? resolve(err) : reject(err);
          }
        });
      });
    }
    function register2(email, password) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), dataEmail = {
          Name: "email",
          Value: email
        }, attributeEmail = new CognitoUserAttribute(dataEmail);
        userPool.signUp(email, password, [attributeEmail], null, (err, result) => {
          if (err)
            return reject(err);
          resolve({ ok: !0, user: result.user });
        });
      });
    }
    function verify2(email, code) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), userData = {
          Username: email,
          Pool: userPool
        };
        new CognitoUser(userData).confirmRegistration(code, !0, function(err, result) {
          return err ? reject(err) : resolve(result);
        });
      });
    }
    function resendCode2(email) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), userData = {
          Username: email,
          Pool: userPool
        };
        new CognitoUser(userData).resendConfirmationCode(function(err, result) {
          return err ? reject(err) : resolve(result);
        });
      });
    }
    function forgotPassword2(email) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), userData = {
          Username: email,
          Pool: userPool
        };
        new CognitoUser(userData).forgotPassword({
          onSuccess: function(data) {
            return resolve({ message: "Reset code sent to email" });
          },
          onFailure: function(err) {
            return err.code === "InvalidParameterException" ? resolve({ unverified: !0 }) : reject({ error: err });
          }
        });
      });
    }
    function resetPassword2(email, code, password) {
      return new Promise((resolve, reject) => {
        let poolData = {
          UserPoolId: "us-west-2_GaPRSslIC",
          ClientId: "235ndfvq07kvd6vv6b0190eato"
        }, userPool = new CognitoUserPool(poolData), userData = {
          Username: email,
          Pool: userPool
        };
        new CognitoUser(userData).confirmPassword(code, password, {
          onSuccess: function(data) {
            return resolve({ message: "Password reset" });
          },
          onFailure: function(err) {
            return reject({ error: err });
          }
        });
      });
    }
    module2.exports = {
      login: login2,
      register: register2,
      verify: verify2,
      resendCode: resendCode2,
      forgotPassword: forgotPassword2,
      resetPassword: resetPassword2
    };
  }
});

// mocks/index.js
var require_mocks = __commonJS({
  "mocks/index.js"() {
    "use strict";
    var { setupServer } = require("msw/node"), server = setupServer();
    server.listen({ onUnhandledRequest: "bypass" });
    process.once("SIGINT", () => server.close());
    process.once("SIGTERM", () => server.close());
  }
});

// server.ts
var server_exports = {};
__export(server_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(server_exports);
var import_architect = require("@remix-run/architect");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 45,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.jsx",
          lineNumber: 88,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/tailwind.css
var tailwind_default = "/_static/build/_assets/tailwind-6J3O334G.css";

// app/root.jsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: tailwind_default }
], meta = () => [{
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
}];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.jsx",
        lineNumber: 32,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.jsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.forgotpassword.jsx
var auth_forgotpassword_exports = {};
__export(auth_forgotpassword_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => auth_forgotpassword_default
});
var import_node2 = require("@remix-run/node"), import_react4 = require("@remix-run/react"), import_react5 = require("react"), import_utils = __toESM(require_utils());

// app/components/auth/FormFooter.jsx
var import_react3 = require("@remix-run/react"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function FormFooter({ links: links3, cta }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "mt-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "text-white", children: cta }, void 0, !1, {
      fileName: "app/components/auth/FormFooter.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    links3.map((link, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        import_react3.Link,
        {
          to: link.url,
          className: "ml-2 mr-2 font-bold text-secondary hover:underline",
          children: link.description
        },
        void 0,
        !1,
        {
          fileName: "app/components/auth/FormFooter.jsx",
          lineNumber: 9,
          columnNumber: 11
        },
        this
      ),
      index < links3.length - 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "text-white", children: " or" }, `span-${link.id}${Math.random()}`, !1, {
        fileName: "app/components/auth/FormFooter.jsx",
        lineNumber: 15,
        columnNumber: 40
      }, this)
    ] }, `${link.id}${Math.random()}`, !0, {
      fileName: "app/components/auth/FormFooter.jsx",
      lineNumber: 8,
      columnNumber: 9
    }, this))
  ] }, void 0, !0, {
    fileName: "app/components/auth/FormFooter.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/auth/FormHeader.jsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function FormHeader({ title, text }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { className: "text-3xl font-bold mb-6 text-white", children: title }, void 0, !1, {
      fileName: "app/components/auth/FormHeader.jsx",
      lineNumber: 4,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "text-white py-5 h-[100px]", children: text }, void 0, !1, {
      fileName: "app/components/auth/FormHeader.jsx",
      lineNumber: 5,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/auth/FormHeader.jsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/components/auth/FormError.jsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function FormError({ error }) {
  return error && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: `text-orange font-semibold mt-4 ${error ? "" : "invisible"}`, children: [
    "\u26A0\uFE0F ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/components/auth/FormError.jsx",
    lineNumber: 3,
    columnNumber: 16
  }, this);
}

// app/routes/_auth.forgotpassword.jsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), action = async ({ request }) => {
  let email = (await request.formData()).get("email");
  if (typeof email != "string")
    throw new Error("Form not submitted correctly.");
  return (await (0, import_utils.forgotPassword)(email)).unverified ? (0, import_node2.redirect)(`/verify?unverified=true&email=${encodeURIComponent(email)}`) : (0, import_node2.redirect)(`/resetpassword?email=${encodeURIComponent(email)}`);
};
function ErrorBoundary() {
  let error = (0, import_react4.useRouteError)(), [params] = (0, import_react4.useSearchParams)(), defaultEmail = params.get("email");
  return renderForm({ error, defaultEmail });
}
function auth_forgotpassword_default() {
  let data = (0, import_react4.useActionData)(), [params] = (0, import_react4.useSearchParams)(), defaultEmail = params.get("email"), linkId = (0, import_react5.useId)();
  return renderForm({ data, linkId, defaultEmail });
}
function renderForm({ error, linkId, defaultEmail }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(FormHeader, { title: "Forgot Password", text: "Request a code to reset your password" }, void 0, !1, {
      fileName: "app/routes/_auth.forgotpassword.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Form, { className: "space-y-4", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Email" }, void 0, !1, {
          fileName: "app/routes/_auth.forgotpassword.jsx",
          lineNumber: 50,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "input",
          {
            type: "email",
            name: "email",
            id: "email",
            defaultValue: defaultEmail,
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.forgotpassword.jsx",
            lineNumber: 51,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.forgotpassword.jsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-secondary text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Forgot Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth.forgotpassword.jsx",
          lineNumber: 62,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_auth.forgotpassword.jsx",
        lineNumber: 61,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.forgotpassword.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(FormError, { error }, void 0, !1, {
      fileName: "app/routes/_auth.forgotpassword.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      FormFooter,
      {
        cta: "Ready to login?",
        links: [{ id: linkId, url: "/login", description: "Log In" }]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_auth.forgotpassword.jsx",
        lineNumber: 71,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.forgotpassword.jsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.resetpassword.jsx
var auth_resetpassword_exports = {};
__export(auth_resetpassword_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action2,
  default: () => auth_resetpassword_default
});
var import_node3 = require("@remix-run/node"), import_react6 = require("@remix-run/react"), import_react7 = require("react"), import_utils2 = __toESM(require_utils());
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), action2 = async ({ request }) => {
  let form = await request.formData(), email = form.get("email"), code = form.get("code"), password = form.get("password");
  if (typeof email != "string")
    throw new Error("Form not submitted correctly.");
  return await (0, import_utils2.resetPassword)(email, code, password), (0, import_node3.redirect)(`/login?email=${encodeURIComponent(email)}`);
};
function ErrorBoundary2() {
  let error = (0, import_react6.useRouteError)(), [params] = (0, import_react6.useSearchParams)(), defaultEmail = params.get("email");
  return renderForm2({ error, defaultEmail });
}
function auth_resetpassword_default() {
  let data = (0, import_react6.useActionData)(), [params] = (0, import_react6.useSearchParams)(), defaultEmail = params.get("email"), linkId = (0, import_react7.useId)();
  return renderForm2({ data, linkId, defaultEmail });
}
function renderForm2({ error, linkId, defaultEmail }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_jsx_dev_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(FormHeader, { title: "Reset Password", text: "Check your email for a code that can be used to reset your password" }, void 0, !1, {
      fileName: "app/routes/_auth.resetpassword.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react6.Form, { className: "space-y-4", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Email" }, void 0, !1, {
          fileName: "app/routes/_auth.resetpassword.jsx",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "input",
          {
            type: "email",
            name: "email",
            id: "email",
            defaultValue: defaultEmail,
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.resetpassword.jsx",
            lineNumber: 50,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.resetpassword.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Reset Code" }, void 0, !1, {
          fileName: "app/routes/_auth.resetpassword.jsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "input",
          {
            type: "test",
            name: "code",
            id: "code",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "123456",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.resetpassword.jsx",
            lineNumber: 62,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.resetpassword.jsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "New Password" }, void 0, !1, {
          fileName: "app/routes/_auth.resetpassword.jsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "input",
          {
            type: "password",
            name: "password",
            id: "password",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "********",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.resetpassword.jsx",
            lineNumber: 73,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.resetpassword.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-secondary text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Reset Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth.resetpassword.jsx",
          lineNumber: 83,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_auth.resetpassword.jsx",
        lineNumber: 82,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.resetpassword.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(FormError, { error }, void 0, !1, {
      fileName: "app/routes/_auth.resetpassword.jsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      FormFooter,
      {
        cta: "Ready to login?",
        links: [{ id: linkId, url: "/login", description: "Log In" }]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_auth.resetpassword.jsx",
        lineNumber: 92,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.resetpassword.jsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}

// app/routes/home.dashboard.jsx
var home_dashboard_exports = {};
__export(home_dashboard_exports, {
  default: () => Dashboard
});
var import_react8 = require("@remix-run/react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function Dashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex-1 bg-primary", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h1", { className: "text-2xl text-center text-secondary font-bold mb-6", children: "Dashboard" }, void 0, !1, {
      fileName: "app/routes/home.dashboard.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "bg-primary w-full h-full flex justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react8.Form, { className: "space-y-4 w-[50%]", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Name" }, void 0, !1, {
          fileName: "app/routes/home.dashboard.jsx",
          lineNumber: 10,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "input",
          {
            type: "text",
            name: "name",
            id: "name",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Name",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.dashboard.jsx",
            lineNumber: 11,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.dashboard.jsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Email" }, void 0, !1, {
          fileName: "app/routes/home.dashboard.jsx",
          lineNumber: 21,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "input",
          {
            type: "text",
            name: "email",
            id: "email",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.dashboard.jsx",
            lineNumber: 22,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.dashboard.jsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-white text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Update"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/home.dashboard.jsx",
          lineNumber: 32,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/home.dashboard.jsx",
        lineNumber: 31,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.dashboard.jsx",
      lineNumber: 8,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/home.dashboard.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.dashboard.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/home.calendar.jsx
var home_calendar_exports = {};
__export(home_calendar_exports, {
  default: () => Calendar
});
var import_react9 = require("@remix-run/react"), import_jsx_dev_runtime9 = require("react/jsx-dev-runtime");
function Calendar() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex-1 bg-primary", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-2xl text-center text-secondary font-bold mb-6", children: "Calendar" }, void 0, !1, {
      fileName: "app/routes/home.calendar.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-primary w-full h-full flex justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react9.Form, { className: "space-y-4 w-[50%]", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Name" }, void 0, !1, {
          fileName: "app/routes/home.calendar.jsx",
          lineNumber: 10,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "input",
          {
            type: "text",
            name: "name",
            id: "name",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Name",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.calendar.jsx",
            lineNumber: 11,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.calendar.jsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Email" }, void 0, !1, {
          fileName: "app/routes/home.calendar.jsx",
          lineNumber: 21,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "input",
          {
            type: "text",
            name: "email",
            id: "email",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.calendar.jsx",
            lineNumber: 22,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.calendar.jsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-white text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Update"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/home.calendar.jsx",
          lineNumber: 32,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/home.calendar.jsx",
        lineNumber: 31,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.calendar.jsx",
      lineNumber: 8,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/home.calendar.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.calendar.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.logout.jsx
var auth_logout_exports = {};
__export(auth_logout_exports, {
  default: () => auth_logout_default
});
var import_react10 = require("@remix-run/react"), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function auth_logout_default() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h2", { className: "text-white w-full", children: [
    "You have been securely logged out.",
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react10.Link, { to: "/login", className: "ms-4", children: "Log in" }, void 0, !1, {
      fileName: "app/routes/_auth.logout.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    " to continue"
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.logout.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.signup.jsx
var auth_signup_exports = {};
__export(auth_signup_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action3,
  default: () => Signup
});
var import_node4 = require("@remix-run/node"), import_react11 = require("@remix-run/react"), import_react12 = require("react"), import_utils3 = __toESM(require_utils());
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), action3 = async ({ request }) => {
  let data = new URLSearchParams(await request.text()), email = data.get("email"), password = data.get("password");
  return await (0, import_utils3.register)(email, password), (0, import_node4.redirect)(`/verify?email=${encodeURIComponent(email)}`);
};
function ErrorBoundary3() {
  let error = (0, import_react11.useRouteError)();
  return renderSignup(error);
}
function Signup() {
  let linkId = (0, import_react12.useId)();
  return renderSignup({ linkId });
}
function renderSignup({ error, linkId }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(FormHeader, { title: "Sign Up", text: "Sign up with an email address. We will only send messages that you have requested to this email" }, void 0, !1, {
      fileName: "app/routes/_auth.signup.jsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_react11.Form, { className: "space-y-4", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Email" }, void 0, !1, {
          fileName: "app/routes/_auth.signup.jsx",
          lineNumber: 35,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "input",
          {
            className: "border border-gray-400 py-2 px-4 rounded-md",
            type: "text",
            name: "email",
            id: "email",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.signup.jsx",
            lineNumber: 36,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.signup.jsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Password" }, void 0, !1, {
          fileName: "app/routes/_auth.signup.jsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "input",
          {
            className: "border border-gray-400 py-2 px-4 rounded-md",
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Password",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.signup.jsx",
            lineNumber: 47,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.signup.jsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
        "button",
        {
          className: "bg-secondary text-primary rounded-md py-2 px-4 mt-4 ",
          type: "submit",
          children: "Sign Up"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth.signup.jsx",
          lineNumber: 57,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_auth.signup.jsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.signup.jsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(FormError, { error }, void 0, !1, {
      fileName: "app/routes/_auth.signup.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      FormFooter,
      {
        cta: "Already have an account?",
        links: [
          { id: linkId, url: "/login", description: "Log In" }
        ]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_auth.signup.jsx",
        lineNumber: 68,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.signup.jsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.verify.jsx
var auth_verify_exports = {};
__export(auth_verify_exports, {
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action4,
  default: () => VerifyForm
});
var import_node5 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), import_react14 = require("react"), import_utils4 = __toESM(require_utils());
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), action4 = async ({ request }) => {
  let form = await request.formData(), email = form.get("email"), code = form.get("code"), action7 = form.get("_action");
  if (action7 === "verify") {
    if (typeof code != "number" && code.toString().length !== 6)
      throw new Error("Please enter your 6 digit verification code");
    return await (0, import_utils4.verify)(email, code), (0, import_node5.redirect)("/dashboard");
  }
  return action7 === "resend" ? (await (0, import_utils4.resendCode)(email), (0, import_node5.redirect)(`/verify?email=${encodeURIComponent(email)}`)) : null;
};
function ErrorBoundary4() {
  let loginLinkId = (0, import_react14.useId)(), signupLinkId = (0, import_react14.useId)(), [params] = (0, import_react13.useSearchParams)(), defaultEmail = params.get("email"), error = (0, import_react13.useRouteError)();
  return renderForm3({ error, defaultEmail, loginLinkId, signupLinkId });
}
function VerifyForm() {
  let loginLinkId = (0, import_react14.useId)(), signupLinkId = (0, import_react14.useId)(), [params] = (0, import_react13.useSearchParams)(), defaultEmail = params.get("email"), error = params.get("unverified") ? { message: "This email has not been verified" } : null;
  return renderForm3({ error, defaultEmail, loginLinkId, signupLinkId });
}
function renderForm3({ error, defaultEmail, loginLinkId, signupLinkId }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_jsx_dev_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(FormHeader, { title: "Verify Email", text: "Check your email for a verification code to finish registration" }, void 0, !1, {
      fileName: "app/routes/_auth.verify.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react13.Form, { className: "space-y-4", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("label", { className: "font-bold text-white", children: "Email" }, void 0, !1, {
          fileName: "app/routes/_auth.verify.jsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          "input",
          {
            type: "email",
            name: "email",
            id: "email",
            defaultValue: defaultEmail,
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.verify.jsx",
            lineNumber: 59,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.verify.jsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "code", children: "Verification Code" }, void 0, !1, {
          fileName: "app/routes/_auth.verify.jsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          "input",
          {
            type: "text",
            name: "code",
            id: "code",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "123456"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.verify.jsx",
            lineNumber: 71,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.verify.jsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex justify-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          "button",
          {
            name: "_action",
            value: "verify",
            type: "submit",
            className: "bg-secondary text-primary rounded-md py-2 px-4 mt-4 w-1/3 flex-grow}",
            children: "Verify"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.verify.jsx",
            lineNumber: 80,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          "button",
          {
            name: "_action",
            value: "resend",
            type: "submit",
            className: "bg-secondary text-primary rounded-md py-2 px-4 ms-4 mt-4 w-1/3 flex-grow}",
            children: "Resend Code"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.verify.jsx",
            lineNumber: 88,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.verify.jsx",
        lineNumber: 79,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.verify.jsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(FormError, { error }, void 0, !1, {
      fileName: "app/routes/_auth.verify.jsx",
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
      FormFooter,
      {
        cta: "Don't have a verification code?",
        links: [
          { id: loginLinkId, url: "/login", description: "Log In" },
          { id: signupLinkId, url: "/signup", description: "Sign Up" }
        ]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_auth.verify.jsx",
        lineNumber: 99,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.verify.jsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

// app/routes/home.profile.jsx
var home_profile_exports = {};
__export(home_profile_exports, {
  default: () => Profile
});
var import_react15 = require("@remix-run/react"), import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function Profile() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex-1 bg-primary", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { className: "text-2xl text-center text-secondary font-bold mb-6", children: "Profile" }, void 0, !1, {
      fileName: "app/routes/home.profile.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-primary w-full h-full flex justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react15.Form, { className: "space-y-4 w-[50%]", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Name" }, void 0, !1, {
          fileName: "app/routes/home.profile.jsx",
          lineNumber: 10,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "input",
          {
            type: "text",
            name: "name",
            id: "name",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Name",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.profile.jsx",
            lineNumber: 11,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.profile.jsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Email" }, void 0, !1, {
          fileName: "app/routes/home.profile.jsx",
          lineNumber: 21,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "input",
          {
            type: "text",
            name: "email",
            id: "email",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/home.profile.jsx",
            lineNumber: 22,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/home.profile.jsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-white text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Update"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/home.profile.jsx",
          lineNumber: 32,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/home.profile.jsx",
        lineNumber: 31,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.profile.jsx",
      lineNumber: 8,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/home.profile.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.profile.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/home.streaks.jsx
var home_streaks_exports = {};
__export(home_streaks_exports, {
  default: () => Streaks,
  loader: () => loader
});
var import_node6 = require("@remix-run/node"), import_react17 = require("@remix-run/react");

// app/components/streaks/Card.js
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
function Card({ goal }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "bg-gray p-3 rounded-lg", children: goal.name }, void 0, !1, {
    fileName: "app/components/streaks/Card.js",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/components/streaks/TitleBar.js
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
function TitleBar({ title, handleClick }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", { className: "text-2xl text-left text-secondary font-bold my-3 px-6 flex justify-between", children: [
    title,
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex justify-end text-base", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "bg-secondary text-primary rounded-md py-2 px-4",
        onClick: handleClick,
        children: "New"
      },
      void 0,
      !1,
      {
        fileName: "app/components/streaks/TitleBar.js",
        lineNumber: 6,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/streaks/TitleBar.js",
      lineNumber: 5,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/streaks/TitleBar.js",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/home.streaks.jsx
var import_react18 = require("react");

// app/components/streaks/AddForm.js
var import_react16 = require("@remix-run/react"), import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
function AddForm({ closeAction, showForm }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react16.Form, { className: `bg-secondary p-6 rounded-md ${showForm ? "block" : "hidden"}`, method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Streak Name" }, void 0, !1, {
        fileName: "app/components/streaks/AddForm.js",
        lineNumber: 7,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "input",
        {
          type: "text",
          name: "name",
          id: "name",
          className: "border border-gray-400 py-2 px-4 rounded-md",
          placeholder: "Streak name",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/streaks/AddForm.js",
          lineNumber: 8,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/streaks/AddForm.js",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Description" }, void 0, !1, {
        fileName: "app/components/streaks/AddForm.js",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "textarea",
        {
          name: "description",
          id: "description",
          className: "border border-gray-400 py-2 px-4 rounded-md",
          placeholder: "Description",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/streaks/AddForm.js",
          lineNumber: 19,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/streaks/AddForm.js",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Start Date" }, void 0, !1, {
        fileName: "app/components/streaks/AddForm.js",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "input",
        {
          type: "date",
          name: "startDate",
          id: "startDate",
          className: "border border-gray-400 py-2 px-4 rounded-md",
          placeholder: "StartDate",
          required: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/streaks/AddForm.js",
          lineNumber: 29,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/streaks/AddForm.js",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex justify-end", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-primary text-white rounded-md py-2 px-4 mt-4",
          children: "Add"
        },
        void 0,
        !1,
        {
          fileName: "app/components/streaks/AddForm.js",
          lineNumber: 39,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "button",
        {
          type: "button",
          className: "bg-gray text-white rounded-md py-2 px-4 mt-4 ml-4",
          onClick: closeAction,
          children: "Cancel"
        },
        void 0,
        !1,
        {
          fileName: "app/components/streaks/AddForm.js",
          lineNumber: 45,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/streaks/AddForm.js",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/streaks/AddForm.js",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/common/Modal.js
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
function Modal({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "absolute top-0 left-0 h-full w-full bg-primary/80 flex justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "w-[80%] md:w-[50%]", children }, void 0, !1, {
    fileName: "app/components/common/Modal.js",
    lineNumber: 4,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/common/Modal.js",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/home.streaks.jsx
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), loader = async () => (0, import_node6.json)([
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 1,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 2,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 3,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 4,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  },
  {
    id: 5,
    name: "Water bottle",
    description: "Drink 1 liter of water every day",
    created: "2023-04-01",
    strk_started: "2023-04-10",
    longest: 4
  },
  {
    id: 6,
    name: "Stretching",
    description: "Do at least 10 minutes of stretching every day",
    created: "2023-02-25",
    strk_started: "2023-03-15",
    longest: 30
  }
]);
function Streaks() {
  let [showModal, setShowModal] = (0, import_react18.useState)(!0), goals = (0, import_react17.useLoaderData)(), displayModal = () => {
    showModal || setShowModal(!0);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex-1 bg-primary", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(TitleBar, { title: "My Streaks", handleClick: () => displayModal() }, void 0, !1, {
      fileName: "app/routes/home.streaks.jsx",
      lineNumber: 542,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "bg-primary w-full h-full px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-scroll", children: goals.map((goal) => /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Card, { goal }, goal.id, !1, {
      fileName: "app/routes/home.streaks.jsx",
      lineNumber: 544,
      columnNumber: 28
    }, this)) }, void 0, !1, {
      fileName: "app/routes/home.streaks.jsx",
      lineNumber: 543,
      columnNumber: 7
    }, this),
    showModal && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Modal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(AddForm, { closeAction: () => setShowModal(!1), showForm: showModal }, void 0, !1, {
      fileName: "app/routes/home.streaks.jsx",
      lineNumber: 547,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/home.streaks.jsx",
      lineNumber: 546,
      columnNumber: 21
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.streaks.jsx",
    lineNumber: 541,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.login.jsx
var auth_login_exports = {};
__export(auth_login_exports, {
  ErrorBoundary: () => ErrorBoundary5,
  action: () => action5,
  default: () => auth_login_default
});
var import_node8 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), import_react20 = require("react"), import_utils5 = __toESM(require_utils());

// app/session.server.js
var import_node7 = require("@remix-run/node"), USER_SESSION_ID_TOKEN = "idToken", USER_SESSION_REFRESH_TOKEN = "refreshToken", sessionStorage = (0, import_node7.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
});
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function logout(request) {
  let session = await getSession(request);
  throw (0, import_node7.redirect)("/logout", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
async function createUserSession({ request, idToken, refreshToken }) {
  let session = await getSession(request);
  return session.set(USER_SESSION_ID_TOKEN, idToken), session.set(USER_SESSION_REFRESH_TOKEN, refreshToken), (0, import_node7.redirect)("/home/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7
      })
    }
  });
}
async function getToken(request) {
  return (await getSession(request)).get(USER_SESSION_ID_TOKEN);
}

// app/routes/_auth.login.jsx
var import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), action5 = async ({ request }) => {
  let form = await request.formData(), email = form.get("email"), password = form.get("password");
  if (typeof email != "string" || typeof password != "string")
    throw new Error("Form not submitted correctly.");
  let result = await (0, import_utils5.login)(email, password);
  return result.code === "UserNotConfirmedException" ? (0, import_node8.redirect)(`/verify?unverified=true&email=${encodeURIComponent(email)}`) : createUserSession({
    request,
    idToken: result.idToken.jwtToken,
    refreshToken: result.refreshToken.token
  });
};
function ErrorBoundary5() {
  let error = (0, import_react19.useRouteError)();
  return renderForm4({ error });
}
function auth_login_default() {
  let data = (0, import_react19.useActionData)(), [params] = (0, import_react19.useSearchParams)(), defaultEmail = params.get("email"), linkId = (0, import_react20.useId)();
  return renderForm4({ data, linkId, defaultEmail });
}
function renderForm4({ error, linkId, defaultEmail }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(FormHeader, { title: "Log In", text: "Log in to start tracking your streaks" }, void 0, !1, {
      fileName: "app/routes/_auth.login.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_react19.Form, { className: "space-y-4", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "email", children: "Email" }, void 0, !1, {
          fileName: "app/routes/_auth.login.jsx",
          lineNumber: 53,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
          "input",
          {
            type: "email",
            name: "email",
            id: "email",
            defaultValue: defaultEmail,
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Email",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.login.jsx",
            lineNumber: 54,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.login.jsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("label", { className: "font-bold text-white", htmlFor: "password", children: "Password" }, void 0, !1, {
          fileName: "app/routes/_auth.login.jsx",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
          "input",
          {
            type: "password",
            name: "password",
            id: "password",
            className: "border border-gray-400 py-2 px-4 rounded-md",
            placeholder: "Password",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth.login.jsx",
            lineNumber: 66,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth.login.jsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "bg-secondary text-primary rounded-md py-2 px-4 mt-4 }",
          children: "Log In"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth.login.jsx",
          lineNumber: 76,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_auth.login.jsx",
        lineNumber: 75,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth.login.jsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(FormError, { error }, void 0, !1, {
      fileName: "app/routes/_auth.login.jsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
      FormFooter,
      {
        cta: "Don't have an account?",
        links: [{ id: linkId, url: "/signup", description: "Sign Up" }]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_auth.login.jsx",
        lineNumber: 85,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth.login.jsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
}

// app/routes/_index.jsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader2,
  meta: () => meta2
});
var import_node9 = require("@remix-run/node"), import_react21 = require("@remix-run/react"), import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), loader2 = async () => (0, import_node9.json)({ message: "Hello, world!" });
function meta2() {
  return [{
    title: "Habit Tracker"
  }];
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h1", { children: "Welcome to Habit Tracker" }, void 0, !1, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_react21.Link, { to: "/signup", children: "Sign up here" }, void 0, !1, {
        fileName: "app/routes/_index.jsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      " to start tracking your habits."
    ] }, void 0, !0, {
      fileName: "app/routes/_index.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.jsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/_auth.jsx
var auth_exports = {};
__export(auth_exports, {
  default: () => Auth,
  loader: () => loader3
});
var import_react22 = require("@remix-run/react");
var import_node10 = require("@remix-run/node"), import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
async function loader3({ request }) {
  return await getToken(request) ? (0, import_node10.redirect)("/home/dashboard") : (0, import_node10.json)({});
}
function Auth() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "min-h-screen bg-primary flex flex-col justify-center items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "max-w-md max-sm:max-w-[90%] w-full mx-auto p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react22.Outlet, {}, void 0, !1, {
    fileName: "app/routes/_auth.jsx",
    lineNumber: 15,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth.jsx",
    lineNumber: 14,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth.jsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// server-entry-module:@remix-run/dev/server-build
var route13 = __toESM(require_utils());

// app/routes/home.jsx
var home_exports = {};
__export(home_exports, {
  action: () => action6,
  default: () => Home,
  links: () => links2,
  loader: () => loader4
});
var import_react26 = require("@remix-run/react");
var import_node11 = require("@remix-run/node");

// app/components/home/Header.jsx
var import_react23 = require("@remix-run/react"), import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
function Header() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("section", { className: "bg-primary p-2 flex justify-end items-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react23.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
    "button",
    {
      type: "submit",
      className: "bg-secondary text-primary rounded-md py-2 px-4",
      children: "Log Out"
    },
    void 0,
    !1,
    {
      fileName: "app/components/home/Header.jsx",
      lineNumber: 8,
      columnNumber: 11
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/home/Header.jsx",
    lineNumber: 7,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/home/Header.jsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/home/Header.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/home/Footer.jsx
var import_react24 = require("@remix-run/react"), import_jsx_dev_runtime23 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("section", { className: "bg-primary p-2 flex justify-end items-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_react24.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
    "button",
    {
      type: "submit",
      className: "bg-secondary text-primary rounded-md py-2 px-4",
      children: "Log Out"
    },
    void 0,
    !1,
    {
      fileName: "app/components/home/Footer.jsx",
      lineNumber: 8,
      columnNumber: 11
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/home/Footer.jsx",
    lineNumber: 7,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/home/Footer.jsx",
    lineNumber: 6,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/home/Footer.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/components/home/Nav.jsx
var import_react25 = require("@remix-run/react"), import_bi = require("react-icons/bi"), import_jsx_dev_runtime24 = require("react/jsx-dev-runtime");
function Nav() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("section", { className: "bg-primary flex flex-col justify-start items-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react25.Link, { to: "/home/dashboard", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "text-secondary px-12 py-6 flex flex-col justify-center items-center mt-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_bi.BiChart, { style: { fontSize: 54 } }, void 0, !1, {
        fileName: "app/components/home/Nav.jsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      "Dashboard"
    ] }, void 0, !0, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 8,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react25.Link, { to: "/home/profile", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "text-secondary px-12 py-6 flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_bi.BiCog, { style: { fontSize: 54 } }, void 0, !1, {
        fileName: "app/components/home/Nav.jsx",
        lineNumber: 15,
        columnNumber: 11
      }, this),
      "Profile"
    ] }, void 0, !0, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 14,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react25.Link, { to: "/home/calendar", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "text-secondary px-12 py-6 flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_bi.BiCalendarStar, { style: { fontSize: 54 } }, void 0, !1, {
        fileName: "app/components/home/Nav.jsx",
        lineNumber: 21,
        columnNumber: 11
      }, this),
      "Calendar"
    ] }, void 0, !0, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react25.Link, { to: "/home/streaks", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "text-secondary px-12 py-6 flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_bi.BiInfinite, { style: { fontSize: 54 } }, void 0, !1, {
        fileName: "app/components/home/Nav.jsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      "Streaks"
    ] }, void 0, !0, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 26,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/home/Nav.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/home/Nav.jsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/styles/home.css
var home_default = "/_static/build/_assets/home-YIXBCKUP.css";

// app/routes/home.jsx
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime"), links2 = () => [
  { rel: "stylesheet", href: home_default }
];
async function loader4({ request }) {
  return await getToken(request) ? (0, import_node11.json)({}) : (0, import_node11.redirect)("/login");
}
async function action6({ request }) {
  return await logout(request), (0, import_node11.json)({});
}
function Home() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_jsx_dev_runtime25.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "h-screen bg-primary flex flex-col justify-between items-center align-stretch overflow:hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/home.jsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "w-full h-[100%] flex justify-between overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Nav, {}, void 0, !1, {
        fileName: "app/routes/home.jsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react26.Outlet, {}, void 0, !1, {
        fileName: "app/routes/home.jsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.jsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Footer, {}, void 0, !1, {
      fileName: "app/routes/home.jsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.jsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/home.jsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "4e849cae", entry: { module: "/_static/build/entry.client-D6UPCX6Y.js", imports: ["/_static/build/_shared/chunk-Q4ZN5I4F.js", "/_static/build/_shared/chunk-2EMYTXBA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/_static/build/root-IYQLRV76.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth": { id: "routes/_auth", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth-4BZSGCPJ.js", imports: ["/_static/build/_shared/chunk-7CAJOGR4.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth.forgotpassword": { id: "routes/_auth.forgotpassword", parentId: "routes/_auth", path: "forgotpassword", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.forgotpassword-XNWBCPPQ.js", imports: ["/_static/build/_shared/chunk-6A6JKI7T.js", "/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_auth.login": { id: "routes/_auth.login", parentId: "routes/_auth", path: "login", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.login-DVKF4UML.js", imports: ["/_static/build/_shared/chunk-6A6JKI7T.js", "/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_auth.logout": { id: "routes/_auth.logout", parentId: "routes/_auth", path: "logout", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.logout-C4PXURLP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_auth.resetpassword": { id: "routes/_auth.resetpassword", parentId: "routes/_auth", path: "resetpassword", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.resetpassword-D44SIZRP.js", imports: ["/_static/build/_shared/chunk-6A6JKI7T.js", "/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_auth.signup": { id: "routes/_auth.signup", parentId: "routes/_auth", path: "signup", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.signup-KEXOHHCF.js", imports: ["/_static/build/_shared/chunk-6A6JKI7T.js", "/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_auth.verify": { id: "routes/_auth.verify", parentId: "routes/_auth", path: "verify", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/_auth.verify-MNYUGMSL.js", imports: ["/_static/build/_shared/chunk-6A6JKI7T.js", "/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/_static/build/routes/_index-MIEF7YBT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home": { id: "routes/home", parentId: "root", path: "home", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/home-XXFJ2C6O.js", imports: ["/_static/build/_shared/chunk-7CAJOGR4.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home.calendar": { id: "routes/home.calendar", parentId: "routes/home", path: "calendar", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/home.calendar-PCYPHJQN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home.dashboard": { id: "routes/home.dashboard", parentId: "routes/home", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/home.dashboard-7YB5VJPU.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home.profile": { id: "routes/home.profile", parentId: "routes/home", path: "profile", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/home.profile-BQALX3EE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home.streaks": { id: "routes/home.streaks", parentId: "routes/home", path: "streaks", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/home.streaks-FGI4V7PK.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/utils": { id: "routes/utils", parentId: "root", path: "utils", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/utils-AAPZ75DD.js", imports: ["/_static/build/_shared/chunk-4SL7JWCL.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/_static/build/manifest-4E849CAE.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !0, unstable_vanillaExtract: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/_static/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_auth.forgotpassword": {
    id: "routes/_auth.forgotpassword",
    parentId: "routes/_auth",
    path: "forgotpassword",
    index: void 0,
    caseSensitive: void 0,
    module: auth_forgotpassword_exports
  },
  "routes/_auth.resetpassword": {
    id: "routes/_auth.resetpassword",
    parentId: "routes/_auth",
    path: "resetpassword",
    index: void 0,
    caseSensitive: void 0,
    module: auth_resetpassword_exports
  },
  "routes/home.dashboard": {
    id: "routes/home.dashboard",
    parentId: "routes/home",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: home_dashboard_exports
  },
  "routes/home.calendar": {
    id: "routes/home.calendar",
    parentId: "routes/home",
    path: "calendar",
    index: void 0,
    caseSensitive: void 0,
    module: home_calendar_exports
  },
  "routes/_auth.logout": {
    id: "routes/_auth.logout",
    parentId: "routes/_auth",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: auth_logout_exports
  },
  "routes/_auth.signup": {
    id: "routes/_auth.signup",
    parentId: "routes/_auth",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: auth_signup_exports
  },
  "routes/_auth.verify": {
    id: "routes/_auth.verify",
    parentId: "routes/_auth",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: auth_verify_exports
  },
  "routes/home.profile": {
    id: "routes/home.profile",
    parentId: "routes/home",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: home_profile_exports
  },
  "routes/home.streaks": {
    id: "routes/home.streaks",
    parentId: "routes/home",
    path: "streaks",
    index: void 0,
    caseSensitive: void 0,
    module: home_streaks_exports
  },
  "routes/_auth.login": {
    id: "routes/_auth.login",
    parentId: "routes/_auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: auth_login_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/_auth": {
    id: "routes/_auth",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/utils": {
    id: "routes/utils",
    parentId: "root",
    path: "utils",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: home_exports
  }
};

// server.ts
require_mocks();
var handler = (0, import_architect.createRequestHandler)({
  build: server_build_exports,
  mode: "development"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=index.js.map
