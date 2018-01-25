<?php
    namespace common\models;

    use yii;
    use yii\base\Models;
    use yii\web\UploadedFile;

    /**
    *  文件上传类
    */
    class Upload extends Model
    {
    	public $file;
        
        // 规则验证
    	function rules()
    	{
            return [
                [['file'],'file','skipOnEmpty' => false, 'extensions' => 'png, jpg','maxFiles' => 10],
            ];
    	}

        // 上传
        function upload()
        {
        	$this->file->saveAs('uploads/'.$this->file->baseName.'.'.$this->file->extension);
        	return true;
        }
    }
?>