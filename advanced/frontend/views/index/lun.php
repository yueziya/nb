<?php
use yii\widgets\ActiveForm;

$form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]);
?>

<?= $form->field($model, 'file[]')->fileInput(['multiple' => true]) ?>
<!-- <?= $form->field($model, 'file')->fileInput() ?> -->
<?= $form->field($model, 'area') ?>
    <button>Submit</button>

<?php ActiveForm::end(); ?>