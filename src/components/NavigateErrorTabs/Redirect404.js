import React, {useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function Redirect404() {
  const navigate = useNavigate();

  useEffect(() => {
      navigate('/404', {replace:true })    
  }, [])

  return (
    <>
    </>
  );
}