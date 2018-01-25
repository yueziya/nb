<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "lg_member".
 *
 * @property string $user_id
 * @property string $true_name
 * @property string $mobile
 * @property string $area
 * @property string $contact_addr
 * @property string $qq
 * @property integer $sex
 * @property string $birthday
 * @property integer $group_id
 * @property integer $exp
 * @property integer $point
 * @property string $message_ids
 * @property string $time
 * @property string $zip
 * @property integer $status
 * @property string $prop
 * @property string $balance
 * @property string $last_login
 * @property string $custom
 * @property string $email
 * @property string $password
 * @property string $image
 */
class LgMember extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'lg_member';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sex', 'group_id', 'exp', 'point', 'status'], 'integer'],
            [['birthday', 'time', 'last_login'], 'safe'],
            [['message_ids', 'prop'], 'string'],
            [['balance'], 'number'],
            [['true_name'], 'string', 'max' => 50],
            [['mobile'], 'string', 'max' => 20],
            [['area', 'custom', 'email', 'password', 'image'], 'string', 'max' => 255],
            [['contact_addr'], 'string', 'max' => 250],
            [['qq'], 'string', 'max' => 15],
            [['zip'], 'string', 'max' => 10],
            [['true_name'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'user_id' => 'User ID',
            'true_name' => 'True Name',
            'mobile' => 'Mobile',
            'area' => 'Area',
            'contact_addr' => 'Contact Addr',
            'qq' => 'Qq',
            'sex' => 'Sex',
            'birthday' => 'Birthday',
            'group_id' => 'Group ID',
            'exp' => 'Exp',
            'point' => 'Point',
            'message_ids' => 'Message Ids',
            'time' => 'Time',
            'zip' => 'Zip',
            'status' => 'Status',
            'prop' => 'Prop',
            'balance' => 'Balance',
            'last_login' => 'Last Login',
            'custom' => 'Custom',
            'email' => 'Email',
            'password' => 'Password',
            'image' => 'Image',
        ];
    }
}
