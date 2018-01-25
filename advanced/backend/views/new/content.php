<?php
?>
<center>
    <form action="?r=new/con" method="post" enctype="multipart/form-data">
        <h1>添加内容</h1>
        <table border="2">
            <tr>
                <td>添加标题</td>
                <td>
                    <input type="text" name="titile"/>
                </td>
            </tr>
            <tr>
                <td>分类添加</td>
                <td>
                    <select name="type_id" id="">
                        <?php foreach($user_arr as $k=>$v){?>
                        <option value="<?=$v['n_id']?>"><?=$v['n_type']?></option>
                        <?php }?>
                    </select>
                </td>
            </tr>
            <tr>
                <td>添加图片</td>
                <td>
                    <input type="file" name="img"/>
                </td>
            </tr>
            <tr>
                <td>添加内容</td>
                <td>
                    <textarea name="text" id="" cols="10" rows="2"></textarea>
                </td>
            </tr>
            <tr>
                <td><input type="submit" value="提交"/></td>
                <td></td>
            </tr>
        </table>
    </form>
</center>