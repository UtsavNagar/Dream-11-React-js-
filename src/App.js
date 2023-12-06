import { Component } from "react";
import dummyData from "./DummyData";
import MumbaiIcon from "./mi.jpg";
import CskIcon from "./csk.png";
import DreamIcon from "./dream11.png";

export default class App extends Component{
  constructor(){
    super()
     this.state={
      dummyData,
      dream11:[],
    }
    this.team_roles={
      wk:0,
      bt:0,
      bw:0,
      ar:0
    }
    this.team_count={
      mi:0,
      csk:0
    }
  }

  teamMembers(ob,team){
    
    if(ob.status==true){
      if(team=="mi") this.team_count.mi-=1;
      else this.team_count.csk-=1;
    }
    else{
      if(team=="mi") this.team_count.mi+=1;
      else this.team_count.csk+=1;
    }

  }

  inclease_role(ob){
    if(ob.status==false){
    if(ob.role=="wk")this.team_roles.wk=this.team_roles.wk+1;
    if(ob.role=="bt")this.team_roles.bt=this.team_roles.bt+1;
    if(ob.role=="ar")this.team_roles.ar=this.team_roles.ar+1;
    if(ob.role=="bw")this.team_roles.bw=this.team_roles.bw+1;
    }
    else{
      if(ob.role=="wk")this.team_roles.wk=this.team_roles.wk-1;
      if(ob.role=="bt")this.team_roles.bt=this.team_roles.bt-1;
      if(ob.role=="ar")this.team_roles.ar=this.team_roles.ar-1;
      if(ob.role=="bw")this.team_roles.bw=this.team_roles.bw-1;

    }
  }

  add_to_11(ob,team){
    this.teamMembers(ob,team);
    this.inclease_role(ob);

    if(this.state.dream11.length<11 && ob.status==false){
      ob.status = true;
      this.setState({dream11:[...this.state.dream11,ob.name]})
    }

    else{
      ob.status = false;
      this.setState({dream11: this.state.dream11.filter(obj=>obj!=ob.name)})
    }
  }
  render(){
    
    return <div>
      <h1 className="text-center bg-danger">Make Your Team</h1>
      <div className="note">
      <b className="text-danger" >
        {this.state.dream11.length==11?"your team is full":""}<br/>
        {this.team_roles.wk==0?"Add atleast 1 wicket keeper":""}<br/>
        {this.team_roles.bt==0?"Add atleast 1 batsman":""}<br/>
        {this.team_roles.ar==0?"Add atleast 1 All Rounder":""}<br/>
        {this.team_roles.bw==0?"Add atleast 1 Bowler":""}<br/>
        {this.team_count.csk<=3 || this.team_count.mi<=3?"Add atleast 4 players from each team":""}
        </b> </div>
      <div className="row ml-5 mr-5 mt-5">
        <div className="col-lg-4 col-sm-6 col-md-4">
        
        <div className="csk_field">
        <ul>
        <img src={CskIcon} height={50}></img>
         {this.state.dummyData.csk.map(ob=><li
          onClick={()=>{ this.add_to_11(ob,"csk")}} 
          style={{background:ob.status?"rgb(175, 175, 1)":""}}>
            {ob.name}</li>
            )}
         </ul>
         </div>
         </div>
    
         <div className="col-lg-4 col-sm-6 col-md-4">
         <div className="mi_field">
        <ul>
        <img src={MumbaiIcon} height={50}></img>
            {this.state.dummyData.mi.map(ob=><li 
                    onClick={()=>{ this.add_to_11(ob,"mi")}}
                    style={{background:ob.status?"rgb(45, 45, 172)":""}}
                      >
                         {ob.name}</li>
            )}
          </ul>
          </div>
        </div>

         <div className="col-lg-4 col-sm-6 col-md-4">
          <div className="dream11_field">
        <ul>
        <img src={DreamIcon} height={50}></img>
         {this.state.dream11.map(ob=><li>{ob}</li>)}
         </ul>
         </div>
         </div>
      </div>
    </div>
  }
}