<?php 
   
   /**
   *    递归
   */
   class Helper
   {
   	

   
   	 public static function getorder($data, $pid = 0, $leavl='')
     {
         $arr=array();
         foreach($data as $v){
         	if($v['parent_id']==$pid){
         		$v['leavl']=$leavl;
         		$arr[]=$v;
         		$arr=array_merge($arr,getorder($data,$v['cat_id'],$leavl.'---'));
         	}
         }
         return $arr;
    }

  //过滤父子极
  public static function gets_son($data ,$pid = 0){
    $arr=array();
    foreach($data as $v){
      if($v['parent_id']==$pid){
        $arr[$v['id']]=$v;
      }else{
        $arr[$v['parent_id']]['son'][]=$v;
      }
    }
    return $arr;
  }

    //子查询
 public static function getsson($data, $pid=0)
 {
     $helper = new Helper();
     $arr=array();
     foreach($data as $v){
          if($v['parent_id']==$pid){
           $son=$helper->getsson($data,$v['id']);
          if(!empty($son)){
               $v['son']=$son;
          }
          
          $arr[]=$v;
          }
     }
     return $arr;
  }

  public function get_leval_id($data){
     static $ids = array();
     foreach($data as $val){
       //print_r($val);die;
       if($val['parent_id']==0){
         $ids[][] = $val['cat_id'];
       }else{
          foreach($ids as $k=>$v){
             if(in_array($val['parent_id'],$v)){
                 $ids[$k][] = $val['cat_id'];
             }
          }
       }
       if(is_array($val['child'])) get_leval_id($val['child']);
     }
     return $ids;
  }
   }
?>