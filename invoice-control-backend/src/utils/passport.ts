import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import { getPrisma } from "@/db/prisma";
import config from "@/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.SECRET_KEY,
};

passport.use(
  new Strategy(options, async (jwtPayload, done) => {
    const prisma = await getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: jwtPayload.sub },
    });

    if (!user) return done(null, false);

    return done(null, user);
  })
);

export default passport;
