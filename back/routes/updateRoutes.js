const router = require('express').Router();
const { updateCompletedTask } = require('../controllers/updateTasks');

router.patch('/update_completed_task/:itemID', updateCompletedTask);
// patch는 변경 사항에 대한 부분만 업데이트 한다.
// put은 전체를 업데이트 한다.

module.exports = router;
