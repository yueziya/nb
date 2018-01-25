<?php
session_start();

include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
//print_r($o);die;
if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
    //print_r($keys);die;
	$keys['redirect_uri'] = WB_CALLBACK_URL;
  //  print_r($keys);die;
    try {
		$token = $o->getAccessToken('code', $keys ) ;
    // print_r($token);die;
	} catch (OAuthException $e) {
	}
}

if ($token) {
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$o->client_id, http_build_query($token) );
?>
授权完成,<a href="weibolist.php">进入你的微博列表页面</a><br />
<?php
} else {
?>
授权失败。
<?php
}
?>
