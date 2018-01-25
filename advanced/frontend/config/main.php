<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'frontend\controllers',
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-frontend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        /*
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        */
        'authClientCollection' => [
            'class' => 'yii\authclient\Collection',
        'clients' => [
            'facebook' => [
                #这里以faceBook为例（Yii2本身已实现）
                'class' => 'yii\authclient\clients\Facebook',
                'clientId' => '101353491', #你的第三方平台申请的AppId
                'clientSecret' => 'fdf4e46ba7da52f787c6e3336d30526e4',#你的第三方平台申请的AppKey
            ],
            'qq' => [
                'class'=>'common\components\QqOAuth',
                'clientId'=>'101353491',
                'clientSecret'=>'fdf4e46ba7da52f787c6e3336d30526e4'
            ],
        ],
      ],
    ],
    'params' => $params,
];
