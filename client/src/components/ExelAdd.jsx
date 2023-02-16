import React, { useState, useEffect } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

function ExelAdd() {

    const [data, setData] = useState([])

    const fileHandler = (event) => {
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {

                console.log({
                    cols: resp.cols,
                    rows: resp.rows
                })
                setData(resp.rows)
            }
        });

    }

    const sent_toBack = async () => {

        const sent_toBack_users = await fetch('http://localhost:5000/save_data',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data)
            })

        const answer_from_back = await sent_toBack_users.json();
        console.log(answer_from_back);

    }

    return (
        <>
            <h1>Загрузка Exel для сохранения в БД</h1>
            <div>
                <input type="file" onChange={(e) => fileHandler(e)} style={{ "padding": "10px" }} />
            </div>
            <div>
                <button onClick={() => sent_toBack()}>Отправить</button>
            </div>

        </>
    )
}

export default ExelAdd