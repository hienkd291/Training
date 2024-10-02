<template>
    <div class="bgr" :style="{ backgroundColor: bgrColor }">
        <div>
            <span>Nhập màu giao diện:</span>
            <input type="text" v-model="bgrColor" placeholder="VD: #000 hoặc red">
        </div>
        <div class="Bai1">
            <h2>Bài 1: Giải phương trình Ax<sup>2</sup> + Bx + C = 0</h2>
            <span>Nhập A = </span>
            <input type="number" v-model.number="a" @keyup.enter="giaiPT"> <br>
            <span>Nhập B = </span>
            <input type="number" v-model.number="b" @keyup.enter="giaiPT"> <br>
            <span>Nhập C = </span>
            <input type="number" v-model.number="c" @keyup.enter="giaiPT"> <br>

            <button  @click="giaiPT">Tính</button>
            <div class="kq" v-if="result">
                <h3>Kết quả:</h3>
                <p>{{ result }}</p>
            </div>
        </div>

        <p>----------------------------------------------------------------------------</p>

        <div class="Bai2">
            <h2>Bài 2:</h2>
            <button @click="insert(1)">1</button>
            <button @click="insert(2)">2</button>
            <button @click="insert(3)">3</button>
            <button @click="insert(4)">4</button>
            <button @click="insert(5)">5</button>
            <button @click="insert(6)">6</button>
            <button @click="insert(7)">7</button>
            <button @click="insert(8)">8</button>
            <button @click="insert(9)">9</button>
            <button @click="insert(0)">0</button>
            <button @click="insert('+')">+</button>
            <button @click="insert('-')">-</button>
            <button @click="insert('Ans')">Ans</button>
            <button @click="Remove">C</button>
            <button @click="Tinh">=</button>
            <div v-for="(kqb2, index) in kqb2s" :key="index">
                <p>{{ kqb2 }}</p>
            </div>
            <p v-if="text">{{ text }}</p>         
        </div>
        
        <p>----------------------------------------------------------------------------</p>
        <div class="Bai3">
            <h2>Bài 3: Chương trình kiểm tra tuổi</h2>
            <span>Tuổi dương lịch</span>
            <input type="number" v-model="tuoiDL"><br>
            <button @click="RemoveB3">Xóa</button>
            <button @click="TraCuuTuoi">Tra cứu</button>
            <div class="valueB3" v-if="tuoiAL">
                <span>Tuổi âm lịch: </span> <span>{{ tuoiAL }}</span>           
            </div>
            
        </div>

        <p>----------------------------------------------------------------------------</p>
        <div class="Bai4">
            <h2>Bài 4: Chương trình kiểm tra chuỗi hợp lệ</h2>
            <p>Hãy nhập vào hộp text (chuỗi từ 1 đến 10)</p>
            <input type="text" v-model="textB4">
            <button @click="CheckText">Submit</button>
            <p v-if="valueB4 && textB4">Chuỗi hợp lệ</p>   
            <p v-else>Chuỗi không hợp lệ</p>   
        </div>

        <p>----------------------------------------------------------------------------</p>
        <div class="Bai5">
            <h2>Bài 5: Siêu tính nhẩm tiểu học</h2>
            <button v-if="timeLeft == -1" @click="startCountDown">Bắt đầu</button>           
            <div v-if="timeLeft > 0">
                <p>Thời gian: {{ timeLeft }}</p>
                <p>Điểm: {{ scoreB5 }}</p>
                <span style="font-size: 30px; font-weight: bold;">{{ soA }} {{ phepTinh }} {{ soB }} = ?</span>
                <span v-if="message">{{ message }}</span>
                <br><br>
                <input ref="answerInput" type="number" placeholder="Kết quả" @keyup.enter="isCheckValueB5" v-model="kqb5">
                <button @click="isCheckValueB5">Kiểm tra</button>               
            </div>
            <div v-else-if="timeLeft == 0">
                <h3>Điểm của bạn: {{ scoreB5 }}</h3>
                <button v-if="timeLeft == 0" @click="startCountDown">Bắt đầu lại</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import { nextTick } from 'vue'; // Nhập nextTick từ vue
    export default {
        data() {
            return {
                a: '',
                b: '',
                c: '',
                result: '',

                ans: 0,
                kqb2s: [],
                text: '',

                tuoiAL: '',
                tuoiDL: '',

                textB4: '',
                valueB4: false,

                bgrColor: '',

                soA: '',
                soB: '',
                phepTinh: '',
                kqb5: '',
                scoreB5: 0,
                timeLeft : -1,
                intervalID: null,
                message: '',
            };
        },

        methods: {
            //Bài 5
            startCountDown(){
                if (this.intervalID)
                    clearInterval(this.intervalID); //Dừng đếm ngược trước đó nếu có
                this.setRandomNumber(); // Tạo phép tính đầu tiên
                this.kqb5 = '';
                this.scoreB5 = 0;
                this.message = '';

                //Auto focus
                this.$nextTick(() => {
                    this.$refs.answerInput.focus();
                });

                this.timeLeft = 60; //Cài thời gian             
                this.intervalID = setInterval(() => {
                    if (this.timeLeft > 0){
                        this.timeLeft--;                       
                    }
                    else{
                        clearInterval(this.timeLeft);
                    }
                }, 1000);
                
            },

            isCheckValueB5(){
                var value = 0;
                if (this.phepTinh === '+')
                    value = this.soA + this.soB;
                else
                    value = this.soA - this.soB;
                if (this.kqb5 === value){
                    this.scoreB5++;
                    this.message = "Đúng rồi!";
                }
                else
                    this.message = "Sai!";
                this.setRandomNumber();
                this.kqb5 = '';
            },

            setRandomOperation(){
                const operators = ['+', '-'];
                const randomIndex = Math.floor(Math.random() * operators.length);
                return operators[randomIndex];
            },

            setRandomNumber(){
                this.soA = Math.floor(Math.random() * 100) + 1; // Tạo số ngẫu nhiên từ 1 đến 100;
                this.soB = Math.floor(Math.random() * 100) + 1; // Tạo số ngẫu nhiên từ 1 đến 100;
                this.phepTinh = this.setRandomOperation();
            },

            giaiPT(){
                const delta = this.b*this.b - 4*this.a*this.c;
                if (this.a === 0){
                    this.result = "Không phải phương trình bậc 2";
                } else if (delta < 0){
                    this.result = "Phương trình vô nghiệm";
                } else if (delta === 0){
                    this.result = "Phương trình có nghiệm kép là: " + (-this.b/(2*this.a));
                } else{
                    const x1 = (-this.b + Math.sqrt(delta)) / (2*this.a);
                    const x2 = (-this.b - Math.sqrt(delta)) / (2*this.a);
                    this.result = this.result = `Phương trình có 2 nghiệm phân biệt là: x1 = ${x1} và x2 = ${x2}`;
                }
            },

            insert(value){
                this.text += value;
            },

            Tinh(){
                let value = 0;
                if (this.text !== ''){
                    if (this.text.includes('+')) {
                        let number = this.text.split('+');
                        if (number.includes('Ans')) {
                            const index = number.indexOf('Ans');
                            number[index] = parseInt(this.ans);
                        }
                        for (let i=0; i<number.length; i++){
                            value += parseInt(number[i]);
                        }
                        this.text += " = " + value;
                        this.kqb2s.push(this.text);
                    } else if (this.text.includes('-')) {
                        let number = this.text.split('-');
                        if (number.includes('Ans')) {
                            const index = number.indexOf('Ans');
                            number[index] = this.ans;
                        }
                            value = parseInt(number[0]) - parseInt(number[1]);
                        this.text += " = " + value;
                        this.kqb2s.push(this.text)
                    }
                    this.ans = value;
                    this.text = '';
                }
            },

            Remove(){
                this.kqb2s = [];
            },

            TraCuuTuoi(){
                const today = new Date();
                let thisYear = today.getFullYear();
                let can = (thisYear - this.tuoiDL) % 10;
                let chi = (thisYear - this.tuoiDL) % 12;

                switch(can) {
                    case 0:
                        this.tuoiAL = 'Canh';
                        break;
                    case 1:
                        this.tuoiAL = 'Tân';
                        break;
                    case 2:
                        this.tuoiAL = 'Nhâm';
                        break;
                    case 3:
                        this.tuoiAL = 'Quí';
                        break;
                    case 4:
                        this.tuoiAL = 'Giáp';
                        break;
                    case 5:
                        this.tuoiAL = 'Ất';
                        break;
                    case 6:
                        this.tuoiAL = 'Bính';
                        break;
                    case 7:
                        this.tuoiAL = 'Đinh';
                        break;
                    case 8:
                        this.tuoiAL = 'Mậu';
                        break;
                    case 9:
                        this.tuoiAL = 'Kỷ';
                        break;
                    default:
                        this.tuoiAL = "Số không hợp lệ";
                    }

                switch(chi) {
                    case 4:
                        this.tuoiAL += ' Tý';
                        break;
                    case 5:
                        this.tuoiAL += ' Sửu';
                        break;
                    case 6:
                        this.tuoiAL += ' Dần';
                        break;
                    case 7:
                        this.tuoiAL += ' Mão';
                        break;
                    case 8:
                        this.tuoiAL += ' Thìn';
                        break;
                    case 9:
                        this.tuoiAL += ' Tỵ';
                        break;
                    case 10:
                        this.tuoiAL += ' Ngọ';
                        break;
                    case 11:
                        this.tuoiAL += ' Mùi';
                        break;
                    case 0:
                        this.tuoiAL += ' Thân';
                        break;
                    case 1:
                        this.tuoiAL += ' Dậu';
                        break;
                    case 2:
                        this.tuoiAL += ' Tuất';
                        break;
                    case 3:
                        this.tuoiAL += ' Hợi';
                        break;
                    default:
                        this.tuoiAL = "Số không hợp lệ";  
                }
            },

            RemoveB3(){
                this.tuoiAL = '';
            },

            CheckText(){
                // let check = false;
                // for (let i=1; i<10; i++){
                //     if (this.textB4 == i){
                //         check = true;
                //         break;
                //     }
                // }
                // if (check){
                //     this.valueB4 = 'Dữ liệu hợp lệ';
                // } else {
                //     this.valueB4 = 'Dữ liệu không hợp lệ';
                // }

                const codeRegex = /^[1-9]{1,10}$/;
                this.valueB4 = codeRegex.test(this.textB4);
            },
        },

        beforeMount() {
            clearInterval(this.intervalID);// Dọn dẹp bộ nhớ
        }
    }
</script>

<style>
@import "@/assets/Bai1.css"
</style>