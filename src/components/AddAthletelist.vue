<template>
  <div >
   <!--<headhead></headhead>-->
    <div class="modeldiv">
      <el-row>
        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    账号
            </el-col>
            <el-col :span="18">
                <el-input v-model="form.PLAYER_NAME" placeholder="" :disabled="true"></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    联系方式
            </el-col>
            <el-col :span="18">
              <el-input v-model="form.PLAYER_TELEPHONE" placeholder=""></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    身高
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.HEIGHT" placeholder=""></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    姓名
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.Name" placeholder=""></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    体重
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.WEIGHT" placeholder=""></el-input>
            </el-col>
        </el-col>
         <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    籍贯
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.NPLACE" placeholder=""></el-input>
            </el-col>
        </el-col>
          <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    年龄
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.AGE" placeholder=""></el-input>
            </el-col>
        </el-col>
          <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    专业等级
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.LEAVEL" placeholder=""></el-input>
            </el-col>
        </el-col>
          <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    项目
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.RECORD_PROJECT" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    性别
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.SEX" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    民族
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.NATION" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    政治面貌
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.POLITICAL" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    通讯地址
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.ADRESS" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    身份证号
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CRAD" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    毕业学校
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.FINISHSCHOOL" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    紧急联系人
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CONTACTS" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6" class="textsize">
            血型
          </el-col>
          <el-col :span="18">
            <el-select v-model="form.BLOOD" placeholder="请选择血型" style="width: 280px">
              <el-option label="血型A" value="血型A"></el-option>
              <el-option label="血型B" value="血型B"></el-option>
              <el-option label="血型AB" value="血型AB"></el-option>
              <el-option label="血型O" value="血型O"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="6"  class="textsize">
                    退队原因 
            </el-col>
            <el-col :span="18">
               <el-input v-model="form.CAUSE" ></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
            <el-col :span="11"  class="textsize">
                    紧急联系人与本人关系
            </el-col>
            <el-col :span="13">
               <el-input v-model="form.CONTACTSRELATION" placeholder=""></el-input>
            </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8"  class="textsize">
            紧急联系人电话
          </el-col>
          <el-col :span="16">
            <el-input v-model="form.CONTACTSPHONE" placeholder=""></el-input>
          </el-col>
        </el-col>

        <el-col :span="8">
            <el-col :span="6" class="textsize">
                    参队日期
            </el-col>
            <el-col :span="18">
               <el-col :span="18">
                 <el-date-picker
                   style="width: 280px"
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
            <el-col :span="6"  class="textsize">
                    出身日期
            </el-col>
            <el-col :span="18">
              <el-date-picker
                style="width: 280px"
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
                style="width: 280px"
                v-model="form.OUTDATE"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
        </el-col>
        <el-col :span="12">
          <el-col :span="4" class="textsize">
            获得荣誉
          </el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              placeholder="请输入内容"
              v-model="form.HONOR">
            </el-input>
          </el-col>
        </el-col>
        <!--<el-col :span="12">-->
          <!--<el-col :span="4" class="textsize">-->
            <!--伤病记录-->
          <!--</el-col>-->
          <!--<el-col :span="20">-->
            <!--<el-input-->
              <!--size="20px"-->
              <!--type="textarea"-->
              <!--:autosize="{ minRows: 8, maxRows: 8}"-->
              <!--placeholder="请输入内容"-->
              <!--v-model="form.HONOR">-->
            <!--</el-input>-->
          <!--</el-col>-->
        <!--</el-col>-->
        <el-col :span="24">
             <el-col :span="12" class="buttondiv">
                 <el-button @click="qxbutton">返回</el-button>
               <el-button type="primary" @click="qrbutton">确认并填写身份证</el-button>
            </el-col>
        </el-col>
      </el-row>
      <el-dialog
        title="照片信息"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <span>
          <el-col :span="24">
        <el-col :span="6" class="textsize">
          照片
        </el-col>
        <el-col :span="18">
          <el-upload
            class="upload-demo"
            ref="upload1"
            action="/UP/upimg"
            :data="photoInfo"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
             <div slot="tip" class="el-upload__tip">请上传一寸证件照</div>
          </el-upload>
        </el-col>
      </el-col>
           <el-col :span="24">
             <el-col :span="6" class="textsize">
                     身份证正面
             </el-col>
             <el-col :span="18">
                <el-upload
                 class="upload-demo"
                 ref="upload2"
                 action="/UP/upimg"
                 :data="pagephoto"
                 :on-preview="handlePreview"
                 :on-change="handleChange1"
                 :on-remove="handleRemove"
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
          <el-col :span="24">
             <el-col :span="6" class="textsize">
                    身份证反面
             </el-col>
             <el-col :span="18">
                <el-upload
                  class="upload-demo"
                  ref="upload3"
                  action="/UP/upimg"
                  :data="pagephotoback"
                  :on-preview="handlePreview"
                  :on-change="handleChange2"
                  :on-remove="handleRemove"
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
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="phontButton">确 定</el-button>
  </span>
      </el-dialog>

    </div>
  </div>
</template>
<script>
 // 引用qs
 import qs from "qs";
// 引用fetch
import fetch from "@/assets/js/fetch.js";
 import {getStore} from "@/assets/js/utils.js";
export default {
  name: "Athlete-list",
  //组件
  components: {
    // headhead
  },
  data: function() {
    let userInfo=getStore('userInfo');

   let a=this.$route.query.pk_user;
   let b=this.$route.query.user_name;

    return {
      dialogVisible: false,

      //照片
      fileList: [],
      //照片判断属性
      file1:"",
      file2:"",
      file3:"",
      //增加
      form: {
        PK_PLAYER:a,
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
        PHOTO:"", //照片
        PLAYER_NAME: b, //名称
        PLAYER_TELEPHONE: "", //联系方式
        POLITICAL: "", //政治面貌
        RECORD_PROJECT: "", //项目
        SEX: "", //性别
        WEIGHT: "" //体重
      },
      //照片
      photoInfo:{
       pk_player:a,
        type:"1"
      },
      //身份证正面
      pagephoto:{
        pk_player:a,
        type:"2"
      },
      //身份证反面
      pagephotoback:{
        pk_player:a,
        type:"3"
      },
    };
  },
  created() {
    //this.userInfo=getStore('userInfo')
  },
  methods: {
    //确认关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    //获取选择成功的参数
    handleChange(file,fileList){
      this.file1=file.size;

    },
    handleChange1(file,fileList){
      this.file2=file.size;

    },
    handleChange2(file,fileList){
      this.file3=file.size;

    },
    //照片
    handleRemove(file, fileList) {

    },
    handlePreview(file) {
    },
    //提交
    qrbutton:function() {

      if(this.form.OUTDATE===""){
        this.$message.error('退队日期不能为空');
      }else if(this.form.JOININGDATE===""){
        this.$message.error('参队日期不能为空');
      }else if(this.form.BIRTHDAY===""){
        this.$message.error('出生日期不能为空');
      }else {
        fetch
          .post("/DP/DPadd", qs.stringify({ ...this.form }))
          .then(res => {

              this.dialogVisible = true;
              this.useraddlist = { brand_right: 0 }
            }
          );
      }
    },
    //取消
    qxbutton:function(){
      let a = this.form.PK_PLAYER;
        fetch
          .post("/DP/deleteUAndP",qs.stringify({pk_player:a}))
          .then(res=>{
            console.log("chengggong")
        })
      this.$router.push({name:'admin-list-2'})
      // this.useraddlist = { brand_right: 0 }
    },
    //照片上传
    phontButton(){
      console.log(typeof this.fileList);
      if (!this.file1){
        alert('未选择照片')
      } if(!this.file2){
        alert('未选择身份证正面')
      }if(!this.file3){
        alert('未选择身份证反面');
      }else {
        this.$refs.upload1.submit();
        this.$refs.upload2.submit();
        this.$refs.upload3.submit();
        this.$router.push({name:'admin-list-2'});
        this.dialogVisible =false;
      }
    },
    submitUpload() {

    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${fileList.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

  }
};
</script>

<style scoped>
.textsize {
  margin: 8px auto;
}
.modeldiv {
  margin-top: 10px;
  user-select: none;
  width: 80%;
  margin-left: 10%;
}
.buttondiv {
  margin-top: 20px;
  margin-left: 40%;
}
</style>


