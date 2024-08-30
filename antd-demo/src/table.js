import {Table} from "antd";
import {useEffect, useState} from "react";

function App(){
    const [columns,setColumns]=useState([]);
    const [dataSource,setDataSource]=useState([]);

    const dataType="comments";
    useEffect(()=>{
        fetch('https://dummyjson.com/${dataType}')
.then(res => res.json())
.then((result)=>{
    const list=result[dataType]||[];
    const firstObject=list[0] || {};
    const cols=[];
    for(const key in firstObject){
        var render=(value)=>{
            return <span>{String(value)}</span>
        }
        if(typeof firstObject[key]==='object'){
            if(Array.isArray(firstObject[key])){
                render=(value)=>{
                    return(<span>{
                        Object.keys(value).map((tag)=>{
                            return(<tag>{tag}</tag>);
                        })
                        }
                        </span>);
                };
            }
            else{
                render=(value)=>{
                    return(<span>{
                        Object.keys(value).map((key)=>{
                            return(<div>{key}:{value[key]}</div>);
                        })
                        }
                        </span>);
                };
            }
            
        }
        const col={
            title:String(key).charAt(0).toUpperCase()+String(key).slice(1),
            dataIndex:key,
            render:render
        }
        cols.push(col);
    }
    setColumns(cols)
    setDataSource(list);
});
    },[]);
    return(
        <div>
        <Table columns={columns} dataSource={dataSource} scroll={{y:500}}/>
        </div>
    );
}
export default Table;
