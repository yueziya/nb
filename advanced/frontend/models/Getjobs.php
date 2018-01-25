<?php
namespace frontend\models;
use yii;
use yii\base\Model;
class GetJobs extends Model{
	public function coms(){
      $com = new \yii\db\Connection([
       'dsn' => 'mysql:host=127.0.0.1;dbname=ll',
       'username' => 'root',
       'password' => 'root',
       ]);
      return $com;
	}
	public function selid($name){
		$common=$this->coms();
        $id=$common->createCommand("select user_id from lg_user where username = '$name'")->query();
        return $id;
	}
}
?>                                                                                                    