<?php
namespace common\widgets;
header('content-type:text/html;charset=utf-8');
use Yii;
use yii\base\Widget;
use yii\helpers\Html;
/**
*   地区小部件
*/
class Area extends widget{
	public $message;
  public function init(){
      parent::init();
      if ($this->message === null) {
          $this->message = '城市选择';
      }
  }
  public function run(){
     $data = Yii::$app->db->createCommand('select * from lg_region where parent_id=1')->queryAll();
     $str='<select name="" class="area">';
          $str.='<option>请选择</option>';
          foreach($data as $v){
            $str.='<option value='.$v['region_name'].'>'.$v['region_name'].'</option>';
          }
      $str.='</select>';
      // var_dump($str);die;
      return $this->message.$str;
  }
}
?>