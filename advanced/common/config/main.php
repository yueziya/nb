<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
       // 配置缓存
        'cache' => [
            'class' => 'yii\caching\FileCache',
	            'class' => 'yii\caching\MemCache',  
		    'servers' => [  
			        [  
			            'host' => '127.0.0.1',  
			            'port' => 11211,  
			            'weight' => 100,  
			        ],  
			        [  
			            'host' => '127.0.0.1',  
			            'port' => 11211,  
			            'weight' => 50,  
			        ],  
		      ],  
        ],
         'authClientCollection' => [
            'class' => 'yii\authclient\Collection',
            'clients' => [
                'qq' => [
                    'class'=>'common\components\QqOAuth',
                    'clientId'=>'101353491',
                    'clientSecret'=>'df4e46ba7da52f787c6e3336d30526e4'
                ],
            ],
        ],
    ],
];
