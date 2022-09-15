import { validateRoute } from "../../libs/validateRoute";
import cookie from "cookie";

export default validateRoute(async (req, res, user) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("APP_TOKEN", "", {
      maxAge: -1,
      path: "/",
    })
  );
  //   res.status(302);
  //   res.setHeader("Location", "/sigin");
  res.end();
});
