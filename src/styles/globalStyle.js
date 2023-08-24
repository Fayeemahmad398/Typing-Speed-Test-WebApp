import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
    box-sizing:border-box;
    margin:0px;
    padding:0px;
}
body{
    // font-family: "Helvetica Neue", Arial, sans-serif;
    margin:0px;
    padding:2px;
    background:${(props) => {
      return props.theme.background;
    }};
    color:${(props) => {
      return props.theme.color;
    }};
    transition:1s all; 
}
.canvas {
  // border: 2px dotted blue;
  display: flex;
  flex-direction:column;
  width:90vw;
  margin-left:auto;
  margin-right:auto;
  gap:17px;
}
// header is styled just below
.Header{
  display:flex;
  justify-content:space-between;
  width:100%;
  // border:2px solid yellow;
  height:fit-content;
  width:100%;
  align-items:center;
 
}
.logo-typing{
  height:60px;
  width:60px;
}
.logo-typing img{
    border:3px dotted ${(props) => {
      return props.theme.color;
    }};
    width:100%;
    height:100%;
    border-radius:50%;
  }
.logo{
  // border:1px solid yellow;
  width:fit-content;
  display:flex;
  align-items:center;
  font-size:1.8rem;
  gap:10px;
}
  .icon-logo{
    // border:1px solid yellow;
  }
  .acount-circle-icon{
    font-size:2.5rem;
    margin:0px 20px;
  }
  .acount-circle-icon:hover{
    cursor:pointer;
  }

  
  .onediv{
    // border:2px solid red;
  }
  .outer-typing-box{
    // border:1px solid red;
  }
  // typing box is styled just below
  .upper-menu{
    // border:2px solid green;
    display:flex;
    justify-content:space-between;
    align-items:end;
    font-size:1.5rem;
    padding:10px;
    margin-top:30px;
    position:relative;
    
  }
  
  .hurry{
    color:red !important;
  }


  .test-mode{
    width:70px;
    border-radius:3px;
    border-right:1px solid;
  }
  .test-mode:hover{
    background:${(props) => {
      return props.theme.background;
    }};
    color:${(props) => {
      return props.theme.color;
    }};
    cursor:pointer;
  }
  .counter{
    border:2px solid ${(props) => {
      return props.theme.color;
    }};
    padding:8px;
    border-radius:5px;
    background:${(props) => {
      return props.theme.color;
    }};
    color:${(props) => {
      return props.theme.background;
    }}
  }
  .test-options{
    // border:1px solid red;
    display:flex;
    gap:20px;
    padding:8px;
    border-radius:5px;
    background:${(props) => {
      return props.theme.color;
    }};
    color:${(props) => {
      return props.theme.background;
    }}
  }
  .type-box{
    // border:2px solid yellow;
    // height:280px;
    max-width:100%;
    overflow:hidden;
    margin-left:auto;
    margin-right:auto;
    margin-top:30px;
    height:300px;
  }
  .words{
    display:flex;
    flex-wrap:wrap;
  }
  
  .word{
  // border:1px solid green;
    font-size:1.7rem;
    margin-right:7px;
    margin-bottom:13px;
  }

.input-box{
  border:none;
  outline:none;
  background:${(props) => {
    return props.theme.background;
  }}
  padding:1px;
  width:0px;
  height:0px;
}

  .blinkerChar{
    border-left:2px solid ${(props) => {
      return props.theme.color;
    }};
    animation:blincking 2s linear infinite;
    }
    @keyframes blincking {
      0%{
        border-left-color:${(props) => {
          return props.theme.color;
        }};
      }
      25%{
        border-left-color:${(props) => {
          return props.theme.background;
        }};
      }
      50%{
        border-left-color:${(props) => {
          return props.theme.color;
        }};
      }
      75%{
        border-left-color:${(props) => {
          return props.theme.background;
        }};
      }
      100%{
        border-left-color:${(props) => {
          return props.theme.color;
        }};
      }
  }

  .blinkerChar-right {
    border-right: 2px solid ${(props) => {
      return props.theme.color;
    }} ;
    animation: blincking-right 2s linear infinite;
    
  }
  @keyframes blincking-right{
    0%{
      border-right-color:${(props) => {
        return props.theme.background;
      }};
    }
    25%{
      border-right-color:${(props) => {
        return props.theme.color;
      }};
    }
    50%{
      border-right-color:${(props) => {
        return props.theme.background;
      }};
    }
    75%{
      border-right-color:${(props) => {
        return props.theme.color;
      }};
    }
    100%{
      border-left-color:${(props) => {
        return props.theme.background;
      }};
    }
      
  
}
  .correct{
    color:#2bd677;

  }
  .Incorrect{
    color:red;
    animation:keepblink 2s linear infinite;
  }







  
  @keyframes keepblink{
    0%{

      color:red;
      
    }
    50%{
      color:#000000;

    }
    100%{
      color:red;

    }
  }
 
// Status box(current analysis graph and details) is  styled just below to it

  .status-box{
    border:1px solid ${(props) => {
      return props.theme.color;
    }};
    display:grid;
    grid-template-columns:1.5fr 2fr;
    width:100%;
    margin-top:20px;
    border-radius:10px;

  }
  .graph-homepage{
    width:100%!important;
    margin:auto;
  }
  .line-component{
    width:100% !important;
  }
  .result{
    // border:1px solid green;
    font-size:2.2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:15px;
    margin-top:20px;

  }
  .graph{
    // border:2px  solid yellow;
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
  }
  .current-graph{
    width:9%;
    // border:1px solid blue;

  }
  .signloginbox{
    text-align:center;
   background:${(props) => {
     return props.theme.background;
   }};
  border-radius:10px;

  }
  .MuiTabs-root{
    border-radius:10px!important;
  }
  .box-signup{
    // border:1px solid !important;
    border-radius:5px;
  }
  .box-login{
    // border:1px solid !important;
    border-radius:5px;

  }
  .signup-btn:hover{
    background:${(props) => {
      return props.theme.background;
    }}
  }
  
// footer is styled just below
  .footer{
    display:flex;
    justify-content:space-between;
    width:100%;
    // border:1px solid ;
    margin-top:10px;
  }

.Links{
  display:flex;
  gap:30px;
  align-items:center;
  
}
a{
  color:${(props) => {
    return props.theme.color;
  }};
}
.contact-icons{
  font-size:2.5rem;
}

.center-loader{
  // border:1px solid red;
  display:flex;
  width:100vw;
  justify-content:center;
  align-items:center;
  height:100vh;
}
.user-info{
  border:1px solid ${(props) => {
    return props.background;
  }};
  width:100%;
  display:grid;
  grid-template-columns:1fr 1fr;
  height:200px;
  margin-top:10px;
  background:${(props) => {
    return props.theme.color;
  }};
  color:${(props) => {
    return props.theme.background;
  }};
  border-radius:20px;
  
}
.user{
display:flex;
gap:20px;
// justify-content:space-around;
align-items:center;
font-size:1.5rem;
padding:10px;
border-right: 2px solid ${(props) => {
  return props.theme.background;
}} ;

}
.profile-icon{
  font-size:5rem;
}
.total-tests{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  font-size:2rem;

}
h1,h2{
  text-align:center;
  margin:2px;
}
.graph-width{
  width:100%!important;
max-height:600px!important;
}
.details-progress{
  margin-top:70px;
  // border:2px solid red;
}

.activeTest{
  background:${(props) => {
    return props.theme.background;
  }};
  color:${(props) => {
    return props.theme.color;
  }};
  border-radius:5px;
  animation:active 1.5s linear infinite;
}

@keyframes active{
  0%{
    background:${(props) => {
      return props.theme.background;
    }};
    color:${(props) => {
      return props.theme.color;
    }};
  } 

  50%{
    background:${(props) => {
      return props.theme.color;
    }};
    color:${(props) => {
      return props.theme.background;
    }};
    
  } 
    
  100%{
    background:${(props) => {
      return props.theme.background;
    }};
    background:${(props) => {
      return props.theme.color;
    }};
    
  }
  }












// Media Queries applied below than  it 



@media (max-width:500px) {
  .logo-typing{
    height:50px;
    width:50px;

  }
  .footer{
    margin-top:20px;
  }
.canvas{
  width:95vw;
  gap:5px;

}
  .logo{
    font-size:1rem;
    gap:0px;
  }
  .acount-circle-icon{
    font-size:1.4rem;
    margin:0px 5px !important;
  }
  .logo-typing img {
    width:80%;
    height:80%;
  }
    
.user-info{
       grid-template-columns:1fr;
       height:350px;
}
.user{
  border-bottom:1px solid; 
   border-right:none;
   flex-direction:column;
   font-size:21px;
}
.upper-menu{
  font-size:1rem;
  flex-direction:column-reverse;
  align-items:center;
  gap:30px;
}



.test-options{
  gap:5px;
  justify-content:center;

} 
.test-mode{
  text-align:center;

}
.type-box{
  margin-top:5px;
}
.word{
  font-size:18px;
}
.status-box{
  grid-template-columns:1fr;
  width:100%;
}
.result{
  gap:2px;
  font-size:1.2rem;
}
.graph{
  width:100%!important;
}
.total-tests{
  font-size:1.5rem;

}
.table-cell{
  font-size:13px!important;
  padding:0px!important;
}
.details-progress {

  margin-top:100px;
}



 }

 
    `;
