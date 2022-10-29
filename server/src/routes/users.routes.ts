import { Router } from "express";
import { USERS, USER_ID, USERS_INFO, BAN_USER_ID, ERASE_IP_BAN_FROM_USER_ID } from "../paths";
import { createUser, getUsers, getUser, deleteUser, updateUser, getUserInfo, banUserId, deleteIpBan} from "../controllers/users.controller";
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
router.delete(ERASE_IP_BAN_FROM_USER_ID, deleteIpBan);
router.post(USERS, createUser);
router.delete(USER_ID, deleteUser);
router.put(USER_ID, updateUser);

export default router;