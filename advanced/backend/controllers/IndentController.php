<?php
namespace backend\controllers;

use app\models\LgResume;
use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\web\SaeAuth;
use yii\web\SaeTClientV2;
use yii\base\Exception;
use yii\web\NotFoundHttpException;
use yii\db\Query;//首先在开头加上这句话
use common\controllers\MyController;
/**
 * Site controller
 */
class IndentController extends MyController
{
    public $enableCsrfValidation = false;
    public $layout = false;
    /**
     * @inheritdoc
     */

    //简历管理
    public function actionIndex()
    {
        $model = new lgresume();
        $reach = $model::find();
        //判断搜索语句
        if ($keywords = Yii::$app->request->get('real_name')) {
            $reach->where(['like', 'real_name', $keywords]);
        }
            $list = $reach
                ->asArray()
                ->all();
            return $this->render('indent.html', ['arr' => $list]);

    }

    public function actionIndent_add()
    {
        if ($post = Yii::$app->request->post()) {
            // echo 1;die;
//            $post['time'] = date("Y-m-d H:i:s");
            $res = \Yii::$app->db->createCommand()->insert('lg_resume', $post)->execute();
            if ($res) {
                echo "<script>alert('添加成功');location.href='?r=indent/index'</script>";
            } else {
                echo "<script>alert('添加失败');location.href='?r=indent/indent_add'</script>";
            }
        } else {
            return $this->render('add_indent.html');
        }
    }

    public function actionIndent_del()
    {
        $id = Yii::$app->request->get('id');
        $res = \Yii::$app->db->createCommand()->delete('lg_resume', "id=" . $id)->execute();
        if ($res) {
            echo "<script>alert('删除成功');location.href='?r=indent/index'</script>";
        } else {
            echo "<script>alert('删除失败');location.href='?r=indent/index'</script>";
        }
    }

    public function actionIndent_upd()
    {
        $id = $_GET['id'];
        $model = new resume();
        $info = $model->find()->where(['id' => "$id"])->one();
        return $this->renderPartial('indent_upd.html', ['arr' => $info]);
    }

    public function actionUpdata()
    {
        $model = new resume();
        $data = $_POST;
        $id = $data['id'];
        $name = $data['real_name'];
        $birth = $data['sex'];
        $region = $data['topDegree'];
        $wanted_job = $data['workyear'];
        $tel = $data['tel'];
        $email = $data['email'];
        $work_expr = $data['currentState'];
        $intro = $data['face'];

        $user = $model->findOne($id);
        $user->real_name = $real_name;
        $user->sex = $sex;
        $user->topDegree = $topDegree;
        $user->workyear = $workyear;
        $user->tel = $tel;
        $user->email = $email;
        $user->currentState = $currentState;
        $user->face = $face;
        $res = $user->update();
        if ($res) {
            echo "<script>alert('修改成功');location.href='?r=indent/index'</script>";
        } else {
            echo "<script>alert('修改失败');location.href='?r=indent/index'</script>";

        }
    }
}