<?php
?>
<div class="row">
    <div id="paper-top">
        <div class="col-lg-3">
            <h2 class="tittle-content-header">
                <i class="icon-window"></i>
                            <span>仪表盘
                            </span>
            </h2>

        </div>

        <div class="col-lg-7">
            <div class="devider-vertical visible-lg"></div>
            <div class="tittle-middle-header">

                <div class="alert">
                    <button type="button" class="close" data-dismiss="alert">×</button>
                    <span class="tittle-alert entypo-info-circled"></span>
                    欢迎回来,&nbsp;
                    <strong><?php echo  $session['admin_user']['username'];?>!</strong>&nbsp;&nbsp;您上次登录时间为：<?= date("H:i:s")?>
                </div>

            </div>

        </div>
        <div class="col-lg-2">
            <div class="devider-vertical visible-lg"></div>
            <div class="btn-group btn-wigdet pull-right visible-lg">
                <div class="btn">
                    小部件</div>
                <button data-toggle="dropdown" class="btn dropdown-toggle" type="button">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul role="menu" class="dropdown-menu">
                    <li>
                        <a href="#">
                            <span class="entypo-plus-circled margin-iconic"></span>添加</a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="entypo-heart margin-iconic"></span>喜欢</a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="entypo-cog margin-iconic"></span>设置</a>
                    </li>
                </ul>
            </div>


        </div>
    </div>
</div>
<ul id="breadcrumb">
    <li>
        <span class="entypo-home"></span>
    </li>
    <li><i class="fa fa-lg fa-angle-right"></i>
    </li>
    <li><a href="#" title="Sample page 1">家</a>
    </li>
    <li><i class="fa fa-lg fa-angle-right"></i>
    </li>
    <li><a href="#" title="Sample page 1">仪表盘</a>
    </li>
    <li class="pull-right">
        <div class="input-group input-widget">

            <input style="border-radius:15px" type="text" placeholder="Search..." class="form-control">
        </div>
    </li>
</ul>