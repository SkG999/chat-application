import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res,next) => {
  try {
    // hmne token cookie me store kar rkha hai  to vha se token nikaal lenge
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ Success: false, message: "User not authenticated !" });
    }
    // check this token that is this valid or not
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res
        .status(401)
        .json({ Success: false, message: "Invalid token !" });
    }
    // decode me hame data milega like jo hamne token bnate time userId save kiya tha vo yha decode me milega
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};
