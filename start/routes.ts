/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("pages/home");
});

Route.get("signup", "SignupController.signupForm");
Route.post("signup", "SignupController.submitSignupForm");
Route.get("signup/check-your-inbox", "SignupController.checkYourInbox");
Route.get("verify-email/:id", "SignupController.verifyEmail");
Route.get("login", "SigninController.create").middleware("guest");
Route.post("login", "SigninController.store").middleware("guest");
Route.get("logout", "SigninController.destroy").middleware("auth");

Route.get("forgot-password", "ForgotPasswordController.emailForm").middleware(
  "guest"
);
Route.post("forgot-password", "ForgotPasswordController.submitEmailForm");

Route.get(
  "forgot-password/check-your-inbox",
  "ForgotPasswordController.checkYourInbox"
).middleware("guest");

Route.get(
  "forgot-password/:id",
  "ForgotPasswordController.resetPasswordForm"
).middleware("guest");

Route.post(
  "forgot-password/:id",
  "ForgotPasswordController.submitResetPasswordForm"
);

// route générique pour confirmer la suppression d'une entité
Route.get("admin/confirm-delete", "AdminController.confirmDelete").middleware(
  "auth"
);

// administration des posts
Route.resource("/admin/posts", "AdminPostsController").middleware({
  "*": "auth",
});

// administration des utilisateurs
Route.resource("/admin/users", "AdminUsersController").middleware({
  "*": "auth",
});

// profil utilisateur
Route.resource("/profile", "profileController")
  .middleware({
    "*": "auth",
  })
  .only(["show", "edit", "update", "destroy"]);
