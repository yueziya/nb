<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "lg_resume".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $real_name
 * @property string $sex
 * @property string $topDegree
 * @property string $workyear
 * @property string $tel
 * @property string $email
 * @property string $currentState
 * @property string $face
 */
class LgResume extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'lg_resume';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id'], 'required'],
            [['user_id'], 'integer'],
            [['real_name', 'sex', 'topDegree', 'workyear', 'tel', 'email', 'currentState', 'face'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'real_name' => 'Real Name',
            'sex' => 'Sex',
            'topDegree' => 'Top Degree',
            'workyear' => 'Workyear',
            'tel' => 'Tel',
            'email' => 'Email',
            'currentState' => 'Current State',
            'face' => 'Face',
        ];
    }
}
