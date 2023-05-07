import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Page404.css"

export default function Page404() {
    const navigate = useNavigate();
    const handleClick = () => {    
        navigate('/app/trangchu')
    }

    return (       
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>:(</h1>
                </div>
                <h2>404 - Trang không tồn tại</h2>
                <p>Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không có sẵn.</p>
                <a onClick={() => handleClick()}>Trang Chủ</a>
            </div>
	    </div>
    );
}