<template>
  <div class="bodydiv">
    <div class="Alist">
      <div>
        <el-button type="danger" size="medium" @click="open1" icon="el-icon-delete">删除</el-button>
        <el-button type="primary" size="medium" @click="dialogVisible1=true" icon="el-icon-circle-plus-outline">新增</el-button>
      </div>
      <el-table
        v-show="select"
        ref="multipleTable"
        :data="athlete"
        tooltip-effect="dark"
        style="width: 100%"
        @cell-click="buttonList"
        :header-cell-style="titletable"
        @selection-change="handleSelectionChange">
        <!-- 删除勾选框 -->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <!-- 列表显示内容 -->
        <el-table-column
          prop="player_CODE"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="record_PROJECT"
          label="项目"
          show-overflow-tooltip
          :filters=jisuan
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip
          :filters="[{text:'男',value:'男'},{text:'女',value:'女'}]"
          :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="player_TELEPHONE"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         </template>
       </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="classpager"
        @current-change="currentChange"
        background
        layout="total,prev, pager, next"
        :total="total">
      </el-pagination>
      <!--详情列表-->
      <el-dialog
        title="运动员详情"
        :visible.sync="dialogVisible"
        width="80%">
            <span>
            <el-row>
              <el-col :span="24">
                <div class="headPortrait">
                  <img v-bind:src="imageSrc" style="width: 80px; height: 80px;">
                </div>
              </el-col>
           <el-col :span="8">
            <el-col :span="6" class="textsize">
                    名称
            </el-col>
            <el-col :span="18">
                <el-input v-model="form.PLAYER_NAME" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    联系方式
            </el-col>
            <el-col :span="18">
              <el-input v-model="form.PLAYER_TELEPHONE" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    身高
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.HEIGHT" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>

         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    姓名
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.NAME" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    体重
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.WEIGHT" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    籍贯
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.NPLACE" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>

          <el-col :span="8">
            <el-col :span="6" class="textsize">
                    年龄
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.AGE" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
          <el-col :span="8">
            <el-col :span="6" class="textsize">
                    专业等级
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.LEAVEL" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
          <el-col :span="8">
            <el-col :span="6" class="textsize">
                    项目
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.RECORD_PROJECT" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>

        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    性别
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.SEX" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    民族
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.NATION" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    政治面貌
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.POLITICAL" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>

        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    通讯地址
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.ADRESS" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    身份证号
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CRAD" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    毕业学校
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.FINISHSCHOOL" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>

        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    紧急联系人
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CONTACTS" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
               <el-col :span="8">
            <el-col :span="6" class="textsize">
                    获得荣誉
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.HONOR" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="8" class="textsize">
                    紧急联系人电话
            </el-col>
            <el-col :span="16">
               <el-input v-model="form.CONTACTSPHONE" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    退队原因
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CAUSE" :disabled=true></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="10" class="textsize">
                    紧急联系人与本人关系
            </el-col>
            <el-col :span="14">
               <el-input v-model="form.CONTACTSRELATION" placeholder="" :disabled=true></el-input>
            </el-col>
        </el-col>
                 <el-col :span="8">
            <el-col :span="6" class="textsize">
                    血型
            </el-col>
            <el-col :span="18">
               <el-select v-model="form.BLOOD" placeholder="请选择血型" :disabled=true>
                <el-option label="血型A" value="血型A"></el-option>
                <el-option label="血型B" value="血型B"></el-option>
                <el-option label="血型AB" value="血型AB"></el-option>
                <el-option label="血型O" value="血型O"></el-option>
            </el-select>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6" class="textsize">
                    参队日期
            </el-col>
            <el-col :span="18">
               <el-col :span="18">
                 <el-date-picker
                   :disabled=true
                   v-model="form.JOININGDATE"
                   type="date"
                   placeholder="选择日期"
                   format="yyyy 年 MM 月 dd 日"
                   value-format="yyyy-MM-dd">
                 </el-date-picker>
            </el-col>
            </el-col>
        </el-col>
           <el-col :span="8">
            <el-col :span="6" class="textsize">
                    出生日期
            </el-col>
            <el-col :span="18">
              <el-date-picker
                :disabled=true
                v-model="form.BIRTHDAY"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    退队日期
            </el-col>
            <el-col :span="18">
              <el-date-picker
                :disabled=true
                v-model="form.OUTDATE"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
        </el-col>
      </el-row>
             <el-button type="primary" @click="download">下载身份证正面</el-button>
             <el-button type="primary" @click="downloada">下载身份证反面</el-button>
            </span>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
      <!--添加运动员账号-->
      <el-dialog
        title="添加运动员账号"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose">
        <span>
        <el-form ref="form" :model="athleteForm" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="athleteForm.RECORD_NAME"></el-input>
          </el-form-item>
        </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="addButton">确 定</el-button>
  </span>
      </el-dialog>
      <!--修改-->
      <el-dialog
        title="提示"
        :visible.sync="updatadialogVisible"
        width="80%"
        :label-position="labelPosition"
        :before-close="handleClose">
        <el-form :model="updataform" :rules="rules" ref="updataform" label-width="100px" class="demo-ruleForm">
          <el-row>
           <el-col :span="8">
            <!--<el-col :span="6" class="textsize">账号</el-col>-->
            <el-col :span="24">
              <el-form-item label="账号" prop="PLAYER_NAME">
                <el-input v-model="updataform.PLAYER_NAME" placeholder="" :disabled=true></el-input>
              </el-form-item>
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">联系方式</el-col>-->
            <el-col :span="24">
              <el-form-item label="联系方式" prop="PLAYER_TELEPHONE">
                <el-input v-model="updataform.PLAYER_TELEPHONE" placeholder=""></el-input>
              </el-form-item>
              <!--<el-input v-model="updataform.PLAYER_TELEPHONE" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">身高</el-col>-->
            <el-col :span="24">
              <el-form-item label="身高" prop="HEIGHT">
                <el-input v-model="updataform.HEIGHT" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.HEIGHT" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">姓名</el-col>-->
            <el-col :span="24">
              <el-form-item label="姓名" prop="NAME">
                <el-input v-model="updataform.NAME" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.NAME" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">体重</el-col>-->
            <el-col :span="24">
              <el-form-item label="体重" prop="WEIGHT">
                <el-input v-model="updataform.WEIGHT" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.WEIGHT" placeholder=""></el-input>-->
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">籍贯</el-col>-->
            <el-col :span="24">
              <el-form-item label="籍贯" prop="NPLACE">
                <el-input v-model="updataform.NPLACE" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.NPLACE" placeholder=""></el-input>-->
            </el-col>
        </el-col>

          <el-col :span="8">
            <!--<el-col :span="6" class="textsize">年龄</el-col>-->
            <el-col :span="24">
              <el-form-item label="年龄" prop="AGE">
                <el-input v-model="updataform.AGE" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.AGE" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
          <el-col :span="8">
            <!--<el-col :span="6" class="textsize">专业等级</el-col>-->
            <el-col :span="24">
              <el-form-item label="专业等级" prop="LEAVEL">
                <el-input v-model="updataform.LEAVEL" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.LEAVEL" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
          <el-col :span="8">
            <!--<el-col :span="6" class="textsize">项目</el-col>-->
            <el-col :span="24">
              <el-form-item label="项目" prop="RECORD_PROJECT">
                <el-input v-model="updataform.RECORD_PROJECT" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.RECORD_PROJECT" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">性别</el-col>-->
            <el-col :span="24">
              <el-form-item label="性别" prop="SEX">
                <el-input v-model="updataform.SEX" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.SEX" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">民族</el-col>-->
            <el-col :span="24">
              <el-form-item label="民族" prop="NATION">
                <el-input v-model="updataform.NATION" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.NATION" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">政治面貌</el-col>-->
            <el-col :span="24">
              <el-form-item label="政治面貌" prop="region">
                <el-input v-model="updataform.POLITICAL" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.POLITICAL" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">通讯地址</el-col>-->
            <el-col :span="24">
              <el-form-item label="通讯地址" prop="ADRESS">
                <el-input v-model="updataform.ADRESS" placeholder=""></el-input>
              </el-form-item>
              <!--<el-input v-model="updataform.ADRESS" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">身份证号</el-col>-->
          <el-col :span="24">
            <el-form-item label="身份证号" prop="CRAD">
              <el-input v-model="updataform.CRAD" placeholder=""></el-input>
            </el-form-item>
               <!--<el-input v-model="updataform.CRAD" placeholder=""></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">毕业学校</el-col>-->
            <el-col :span="24">
              <el-form-item label="毕业学校" prop="FINISHSCHOOL">
                <el-input v-model="updataform.FINISHSCHOOL" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.FINISHSCHOOL" placeholder="" ></el-input>-->
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">紧急联系人</el-col>-->
            <el-col :span="24">
              <el-form-item label="紧急联系人" prop="CONTACTS">
                <el-input v-model="updataform.CONTACTS" placeholder=""></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.CONTACTS" placeholder=""></el-input>-->
            </el-col>
        </el-col>
               <el-col :span="8">
            <!--<el-col :span="6" class="textsize">获得荣誉</el-col>-->
            <el-col :span="24">
              <el-form-item label="获得荣誉" prop="HONOR">
                <el-input v-model="updataform.HONOR" placeholder=""></el-input>
              </el-form-item>
              <!--<el-input v-model="updataform.HONOR" placeholder="" ></el-input>-->
            </el-col>
        </el-col>

            <el-col :span="8">
              <!--<el-col :span="6" class="textsize">退队原因</el-col>-->
              <el-col :span="24">
                <el-form-item size="20px" label="退队原因" prop="CAUSE" >
                  <el-input v-model="updataform.CAUSE" placeholder=""></el-input>
                </el-form-item>
                <!--<el-input v-model="updataform.CAUSE" ></el-input>-->
              </el-col>
            </el-col>
        <el-col :span="8">
            <!--<el-col :span="8" class="textsize">紧急联系人电话</el-col>-->
            <el-col :span="7">
              紧急联系人电话
            </el-col>
            <el-col :span="17">
              <el-form-item prop="CONTACTSPHONE">
              <el-input v-model="updataform.CONTACTSPHONE"  placeholder="请输入内容" style="margin-left: -68%;width: 166%;"></el-input>
              </el-form-item>
              <!--<el-form-item size="20px"  prop="region">-->
                <!--<el-input v-model="updataform.CONTACTSPHONE" placeholder="" style="width: 300px"></el-input>-->
              <!--</el-form-item>-->
               <!--<el-input v-model="updataform.CONTACTSPHONE" placeholder="" ></el-input>-->
            </el-col>
        </el-col>


        <el-col :span="8">
            <el-col span="10">
              <div>
                紧急联系人与本人关系
              </div>

            </el-col>
            <!--<el-col :span="10" class="textsize">紧急联系人与本人关系</el-col>-->
            <el-col :span="14">
              <el-form-item prop="CONTACTSRELATION" >
                <el-input v-model="updataform.CONTACTSRELATION" style="width: 170%;margin-left: -72%"></el-input>
              </el-form-item>
               <!--<el-input v-model="updataform.CONTACTSRELATION" placeholder=""></el-input>-->
            </el-col>
        </el-col>
            <el-col :span="8">
            <!--<el-col :span="6" class="textsize">血型</el-col>-->
            <el-col :span="24">
              <el-form-item label="血型" prop="BLOOD">
                <el-select v-model="updataform.BLOOD" placeholder="请选择活动区域" style="width: 100%">
                  <el-option label="血型A" value="血型A"></el-option>
                  <el-option label="血型B" value="血型B"></el-option>
                  <el-option label="血型AB" value="血型AB"></el-option>
                  <el-option label="血型O" value="血型O"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-col>
         <el-col :span="8">
            <!--<el-col :span="6" class="textsize">参队日期</el-col>-->
            <el-col :span="24">
              <el-form-item label="参队日期" prop="JOININGDATE">
                <el-date-picker
                  v-model="updataform.JOININGDATE"
                  type="date"
                  style="width: 100%"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
        </el-col>
           <el-col :span="8">
            <!--<el-col :span="6" class="textsize">出生日期</el-col>-->
            <el-col :span="24">
              <el-form-item label="出生日期" prop="BIRTHDAY">
                <el-date-picker
                  v-model="updataform.BIRTHDAY"
                  type="date"
                  style="width: 100%"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
        </el-col>
        <el-col :span="8">
            <!--<el-col :span="6" class="textsize">退队日期</el-col>-->
            <el-col :span="24">
              <el-form-item label="退队日期" prop="">
                <el-date-picker
                  v-model="updataform.OUTDATE"
                  type="date"
                  style="width: 100%"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <!--<el-date-picker-->
                <!--v-model="updataform.OUTDATE"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--format="yyyy 年 MM 月 dd 日"-->
                <!--value-format="yyyy-MM-dd">-->
              <!--</el-date-picker>-->
            </el-col>
        </el-col>
          <br>
            <el-col :span="8">
        <el-col :span="6" class="textsize">
          照片
        </el-col>
        <el-col :span="18">
          <el-upload
            class="upload-demo"
            ref="upload1"
            action="/UP/upimg"
            :data="photoInfo"
            :on-success="successon"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
             <div slot="tip" class="el-upload__tip">请上传一寸证件照,只能上传jpg/png文件</div>
          </el-upload>
        </el-col>
      </el-col>
           <el-col :span="8">
             <el-col :span="6" class="textsize">
                     身份证正面
             </el-col>
             <el-col :span="18">
                <el-upload
                  class="upload-demo"
                  ref="upload2"
                  action="/UP/upimg"
                  :data="pagephoto"
                  :file-list="fileList"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :auto-upload="false">
                 <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                 <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
             </el-col>
         </el-col>
          <el-col :span="8">
             <el-col :span="6" class="textsize">
                    身份证反面
             </el-col>
             <el-col :span="18">
                <el-upload
                  class="upload-demo"
                  ref="upload3"
                  action="/UP/upimg"
                  :data="pagephotoback"
                  :file-list="fileList"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :auto-upload="false">
                 <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                 <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
             </el-col>
         </el-col>
      </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="updatadialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatabutton">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import fetch from "@/assets/js/fetch.js";
  import qs from "qs";
  export default {
    name: "ath-list",
    data: function () {
      return {
        //正则表达式
        rules:{
          PLAYER_TELEPHONE:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
          ],
          HEIGHT:[
            { required: true, message: '请输入正确身高', trigger: 'blur' },
            { min: 3, max: 3, message: '长度在 3个字符（单位CM）', trigger: 'blur' }
          ],
          NAME:[
            { required: true, message: '请输入正确姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在2-4个字符', trigger: 'blur' }
          ],
          WEIGHT:[
            { required: true, message: '请输入正确体重', trigger: 'blur' },
            { min: 2, max: 3, message: '长度在2-4个字符（单位kg）', trigger: 'blur' }
          ],
          NPLACE:[
            { required: true, message: '请输入正确籍贯', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在2-6个字符', trigger: 'blur' }
          ],
          AGE:[
            { required: true, message: '请输入正确年龄', trigger: 'blur' },
            { min: 2, max: 2, message: '长度在2个字符', trigger: 'blur' }
          ],
          LEAVEL:[
            { required: true, message: '请输入正确等级', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在1-8个字符', trigger: 'blur' }
          ],
          RECORD_PROJECT:[
            { required: true, message: '请输入正确项目', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur' }
          ],
          SEX:[
            { required: true, message: '请输入正确性别', trigger: 'blur' },
            { min: 1, max: 1, message: '长度在1个字符', trigger: 'blur' }
          ],
          NATION:[
            { required: true, message: '请输入正确名族', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在1-5个字符', trigger: 'blur' }
          ],
          ADRESS:[
            { required: true, message: '请输入正确通讯地址', trigger: 'blur' },
            { min: 1, max:30, message: '长度在1-30个字符', trigger: 'blur' }
          ],
          CRAD:[
            { required: true, message: '请输入正确身份证号码', trigger: 'blur' },
            { min: 15, max:18, message: '长度在15-18个字符', trigger: 'blur' }
          ],
          FINISHSCHOOL:[
            { required: true, message: '请输入毕业学校', trigger: 'blur' },
            { min: 1, max:20, message: '长度在1-20个字符', trigger: 'blur' }
          ],
          CONTACTS:[
            { required: true, message: '请输入紧急联系人', trigger: 'blur' },
            { min: 2, max:8, message: '长度在2-8个字符', trigger: 'blur' }

          ],
          HONOR:[
            { required: true, message: '请填写荣誉', trigger: 'blur' },
            { min: 1, max:100, message: '请填写荣誉', trigger: 'blur' }
          ],
          CONTACTSPHONE:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
          ],
          CONTACTSRELATION:[
            { required: true, message: '请输入正确格式', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2-20个字符', trigger: 'blur' }
          ],
          BLOOD:[
            { required: true, message: '请选择血型', trigger: 'change' }
          ],
          JOININGDATE:[
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ],
          BIRTHDAY:[
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        labelPosition: 'left',
        fileList:[],
        // 照片
        imageSrc:"",
        rowId:"",
        //身份证反面
        pagephotoback1:"",
        //身份证正面
        pagephoto1:"",
        //详情
        dialogVisible: false,
        //添加
        dialogVisible1: false,
        //修改
        updatadialogVisible:false,
        form: {
          PLAYER_CODE:"",//编码
          ADRESS: "", //通讯地址
          AGE: "", //年龄
          BIRTHDAY: "", //出生日期
          BLOOD: "", //血型
          CAUSE: "", //退队原因
          CONTACTS: "", //紧急联系人
          CONTACTSPHONE: "", //紧急联系人电话
          CONTACTSRELATION: "", //紧急联系人与本人关系
          CRAD: "", //身份证号
          FINISHSCHOOL: "", //毕业学校
          HEIGHT: "", //身高
          HONOR: "", //荣誉等级
          img: "", //头像（照片）
          PAGEPHOTOBACK: "", //证件照反
          PAGEPHOTO: "", // 证件照正面
          JOININGDATE: "", //参队日期
          LEAVEL: "", //专业等级
          NAME: "", //姓名
          NATION: "", //民族
          NPLACE: "", //籍贯
          OUTDATE: "", //退队日期
          PHOTO: "", //照片
          PLAYER_NAME: "", //名称
          PLAYER_TELEPHONE: "", //联系方式
          POLITICAL: "", //政治面貌
          RECORD_PROJECT: "", //项目
          SEX: "", //性别
          WEIGHT: "" //体重
        },
        //照片
        photoInfo:{
          pk_player:"",
          type:"1"
        },
        //身份证正面
        pagephoto:{
          pk_player:"",
          type:"2"
        },
        //身份证反面
        pagephotoback:{
          pk_player:"",
          type:"3"
        },
        updataform:{},
        athleteForm:{
          //运动员账号
          RECORD_NAME: "",
          //运动员身份
          RECORD_ROLE: "运动员",
        },
        totalList: [],
        multipleSelection: "",
        page: 1,
        //筛选数组
        project: [],
        //v-show select
        select: false

      };
    },
    created() {
      this.getData();
      //去重复
      Array.prototype.unique = function(key) {
        var arr = this;
        var n = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
          if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
          } else {
            inner: {
              var has = false;
              for (var j = 0; j < n.length; j++) {
                if (arr[i][key] == n[j][key]) {
                  has = true;
                  break inner;
                }
              }
            }
            if (!has) {
              n.push(arr[i]);
            }
          }
        }
        return n;
      };
    },
    //计算属性
    computed: {
      jisuan(){
       return this.project.unique('text')
      },
    athlete() {
        let val = this.page;
        return this.totalList.slice((val - 1) * 10, val * 10);
      },
      total() {
        if (this.totalList) {
          return this.totalList.length;
        }
      }
    },
    methods: {
    //photo
      successon(response, file, fileList){
        console.log("上传成功时候的钩子",response,"file", file,"fileList", fileList)
      },
      //敏感信息关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.athleteForm.RECORD_NAME="";
            done();
            this.imageSrc=""
          })
          .catch(_ => {});
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      currentChange(val) {
        this.page = val;
        //this.athlete =;
      },
      // 显示
      getData(){
        fetch
          .get("/DP/DPshowlist")
          .then(res => {
            let  map = res.data.data;
            console.log(res.data.data);
            for (let i=0; i<map.length; i++){
              let list={text:'',value:''};
              list.value =map[i].record_PROJECT;
              list.text =map[i].record_PROJECT;
              this.project.push(list);
            }
            this.select=true;
            this.totalList = res.data.data;
            this.totalList.forEach(item => this.$set(item, "checked", false));
          })
          .catch(err => {
            alert("错误");
          });
      },
      //批量删除
      open1() {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.mulRemoveath();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //单条传id，多条不传
      mulRemoveath(id) {
        debugger;
        let ids = [];
        if (id) {
          ids.push(id);
        } else {
          ids = this.multipleSelection
            .map(item => item.pk_PLAYER)
            .filter(item => item !== undefined);
        }
        fetch
          .post("/DP/DPdelete", qs.stringify({key: ids.join()}))
          .then(res => {
            if (res.data.status === "success") {
              //this.$message.success(res.data.message);
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.totalList = this.totalList.filter(
                item => ids.indexOf(item.pk_PLAYER) === -1
              );
            }
          });
      },
      buttonList(row,column) {
        console.log(column.label);
        if(column.label === "操作"){
        }else {
          this.rowId=row.pk_PLAYER;
          //照片
          fetch
            .get("UP/backimg",{
              responseType:'blob',
              params:{
                type:'1',
                pk_player:row.pk_PLAYER
              }
            })
            .then(res=>{
              let url=URL.createObjectURL(res.data);
              this.imageSrc =url;
            });
          this.form.ADRESS = row.adress; //通讯地址
          this.form.AGE = row.age;  //年龄
          this.form.BIRTHDAY = row.birthday;  //出生日期
          this.form.BLOOD = row.blood;  //血型
          this.form.CAUSE = row.cause;  //退队原因
          this.form.CONTACTS = row.contacts;  //紧急联系人
          this.form.CONTACTSPHONE = row.contactsphone;  //紧急联系人电话
          this.form.CONTACTSRELATION = row.contactsrelation; //紧急联系人与本人关系
          this.form.CRAD = row.crad;  //身份证号
          this.form.FINISHSCHOOL = row.finishschool;  //毕业学校
          this.form.HEIGHT = row.height;  //身高
          this.form.HONOR = row.honor;  //荣誉等级
          this.form.img = row.img;  //头像（照片）
          this.form.PAGEPHOTOBACK = row.pagephotoback;  //证件照反
          this.form.PAGEPHOTO = row.pagephoto;  // 证件照正面
          this.form.JOININGDATE = row.joiningdate;  //参队日期
          this.form.LEAVEL = row.leavel;  //专业等级
          this.form.NAME = row.name; //姓名
          this.form.NATION = row.nation;  //民族
          this.form.NPLACE = row.nplace;  //籍贯
          this.form.OUTDATE = row.outdate;  //退队日期
          this.form.PHOTO = row.photo;  //照片
          this.form.PLAYER_NAME = row.player_NAME;  //名称
          this.form.PLAYER_TELEPHONE = row.player_TELEPHONE;  //联系方式
          this.form.POLITICAL = row.political;  //政治面貌
          this.form.RECORD_PROJECT = row.record_PROJECT;  //项目
          this.form.SEX = row.sex; //性别
          this.form.WEIGHT = row.weight; //体重
          this.dialogVisible = true;
        }
      },
      //筛选
      filterHandler(value,row,column){
        console.log(value,row,column);
        const property =column['property'];
        return row[property]===value;
      },
      //下载(身份证正面)
      download(){
        let alink =document.createElement("a");
        alink.download="name1";
        alink.href=`/DI/downimg?pk_player=${this.rowId}&type=2`;
        console.log("type1",alink.href);
        alink.click();
      },
      //下载（身份证反面）
      downloada(){
        let alink1 =document.createElement("a");
        alink1.download="name2";
        alink1.href=`/DI/downimg?pk_player=${this.rowId}&type=3`;
        console.log("type2",alink1.href);
        alink1.click();
      },
      //添加运动员账号
      addButton(){
        fetch.post("DR/DRaddPlayer",qs.stringify(this.athleteForm))
          .then(res=>{
            if(res.data.data===null){
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }else{
              let pkuser = res.data.data.pk_user;
              let username = res.data.data.user_name;
              let pkidentity = res.data.data.pk_identity;
              let userpasswd = res.data.data.user_passwd;
              this.$router.push({name:'addath',query:{pk_user:pkuser,user_name:username,pk_identity:pkidentity,user_passwd:userpasswd}})
            }
        }).catch(()=>{
          this.$message({
            message: '服务器错误',
            type: 'warning'
          })
        })
      },
      //修改
      updatabutton(){
        this.$refs.upload1.submit();
        this.$refs.upload2.submit();
        this.$refs.upload3.submit();
          fetch.post("/DP/DPupdate",qs.stringify(this.updataform))
            .then(res=>{
              this.getData();
              this.updatadialogVisible=false;
            })
      },
      handleEdit(index,row){
        console.log("row",row);
        this.photoInfo.pk_player=row.PK_PLAYER;
        this.pagephoto.pk_player=row.PK_PLAYER;
        this.pagephotoback.pk_player=row.PK_PLAYER;
        this.updataform=this.form;
        this.updataform.PK_PLAYER=row.PK_PLAYER;
        this.updataform.ADRESS = row.adress; //通讯地址
        this.updataform.AGE = row.age;  //年龄
        this.updataform.BIRTHDAY = row.birthday;  //出生日期
        this.updataform.BLOOD = row.blood;  //血型
        this.updataform.CAUSE = row.cause;  //退队原因
        this.updataform.CONTACTS = row.contacts;  //紧急联系人
        this.updataform.CONTACTSPHONE = row.contactsphone;  //紧急联系人电话
        this.updataform.CONTACTSRELATION = row.contactsrelation; //紧急联系人与本人关系
        this.updataform.CRAD = row.crad;  //身份证号
        this.updataform.FINISHSCHOOL = row.finishschool;  //毕业学校
        this.updataform.HEIGHT = row.height;  //身高
        this.updataform.HONOR = row.honor;  //荣誉等级
        this.updataform.img = row.img;  //头像（照片）
        this.updataform.PAGEPHOTOBACK = row.pagephotoback;  //证件照反
        this.updataform.PAGEPHOTO = row.pagephoto;  // 证件照正面
        this.updataform.JOININGDATE = row.joiningdate;  //参队日期
        this.updataform.LEAVEL = row.leavel;  //专业等级
        this.updataform.NAME = row.name; //姓名
        this.updataform.NATION = row.nation;  //民族
        this.updataform.NPLACE = row.nplace;  //籍贯
        this.updataform.OUTDATE = row.outdate;  //退队日期
        this.updataform.PHOTO = row.photo;  //照片
        this.updataform.PLAYER_NAME = row.player_NAME;  //名称
        this.updataform.PLAYER_TELEPHONE = row.player_TELEPHONE;  //联系方式
        this.updataform.POLITICAL = row.political;  //政治面貌
        this.updataform.RECORD_PROJECT = row.record_PROJECT;  //项目
        this.updataform.SEX = row.sex; //性别
        this.updataform.WEIGHT = row.weight; //体重
        this.updatadialogVisible = true;
      },
      //修改照片
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${fileList.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //style
      titletable({row, rowIndex}) {
        return {background: "#212529", color: "#fff"};
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    outline:none;
  }
  .classpager{
    background-color: white;
  }
  .headPortrait {
    width: 100px;
    height: 100px;
    float: left;
  }
</style>
