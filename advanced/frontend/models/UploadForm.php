<?php
namespace frontend\models;
use Yii;
use yii\base\Model;
use yii\web\UploadedFile;

/**
*  文件上传
*/
class UploadForm extends Model
{
    /**
     * @var UploadedFile|Null file attribute
     */
    public $file;
    public $area;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['area'],'required'],
            [['file'], 'file', 'maxFiles' => 10,'extensions'=>'jpg,png,gif'], // <--- here!
        ];
    }
}
?>