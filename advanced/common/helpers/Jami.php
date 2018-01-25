<?php

class Jami
{
    
    /**
     * 简单对称加密算法之加密
     * @param String $string 需要加密的字串
     * @param String $skey 加密EKY
     * @author zze 
     * @return String
     */
    /**
    * 
    */
    public static function encode($string = '', $skey = 'hengnicai')
    {
    	//通过base64 对 数据 进行编码 同时分割成数组
        $strArr = str_split(base64_encode($string));

        //统计分割的长度
        $strCount = count($strArr);
        foreach (str_split($skey) as $key => $value)
        {
            $key < $strCount && $strArr[$key].=$value;
        }
        return str_replace(array('=', '+', '/'), array('O0O0O', 'o000o', 'oo00o'), join('', $strArr));
    }



    /**
     * 简单对称加密算法之解密
     * @param String $string 需要解密的字串
     * @param String $skey 解密KEY
     * @author Zze
     * @return String
     */
    public static function decode($string = '', $skey = 'hengnicai')
    {
        $strArr = str_split(str_replace(array('O0O0O', 'o000o', 'oo00o'), array('=', '+', '/'), $string), 2);
        $strCount = count($strArr);
        foreach (str_split($skey) as $key => $value)
        {
            $key <= $strCount  && isset($strArr[$key]) && $strArr[$key][1] === $value && $strArr[$key] = $strArr[$key][0];
        }
        return base64_decode(join('', $strArr));
    }
    // echo '<pre>';
    // // $str = '张三和咯哦world';
    // // echo $str;
    // // echo "<br>";
    // // echo encode($str);exit;
    // $_key = "50b8ypgh5pLCiJ5ZKM5ZKv5ZOmd29ybGQO0O0O";
    // echo decode($_key);exit;



    // echo "string : " . $str . " <br />";
    // echo "encode : " . ($enstring = encode($str)) . '<br />';
    // // exit;
    // echo "decode : " . decode($enstring);
    // die();
}

?>