import { Router } from "express";
import { USERS, USER_ID, USERS_INFO, BAN_USER_ID, BAN_IP } from "../paths";
import { createUser, getUsers, getUser, deleteUser, updateUser, getUserInfo, banUserId, deleteIpBan, banIp, getBanIps} from "../controllers/users.controller";
import expeditious from 'express-expeditious';

const cacheoptions = {
    namespace: 'expresscache',
    defaultTtl: '24 hours',
    statusCodeExpires: {
        404: '1 minute',
        500: '1 minute'
    },
    engine: (expeditious as any).cacheEngine,
  };

  const cache = expeditious(cacheoptions);

const router = Router();

router.get(USERS, getUsers);
router.get(USER_ID, getUser);
router.get(USERS_INFO, cache.withTtl('24 hours'), getUserInfo);
router.put(BAN_USER_ID, banUserId);
router.get(BAN_IP, getBanIps);
router.put(BAN_IP, banIp);
router.delete(BAN_IP, deleteIpBan);
router.post(USERS, createUser);
router.delete(USER_ID, deleteUser);
router.put(USER_ID, updateUser);

export default router;