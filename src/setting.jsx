import "./css/setting.css"
export const  Setting=()=>{
    return(
        <div className="setting c">
                <div className="AddfilePath componetSet">
                    <div className="headSpecificSetting">Add  path</div>
                    <div>
                    <input type="text" className="inputFieldForSetting"></input>
                    </div>
                    <div>
                        <button>save</button>
                        <button>cancel</button>
                     </div>
                </div>
                
                <div className="ChangeAccess componetSet">
                    <div className="headSpecificSetting">change access  path</div>
                    <div>
                        <div>select File path</div>
                        <div><select className="inputFieldForSetting">
                            <option value=""></option>
                            
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>select  new role</div>
                        <div>
                            <select className="inputFieldForSetting" >
                           <option value=""></option>
                          </select>
                        </div>
                  </div>
                  <div>
                        <button>save</button>
                        <button>cancel</button>
                     </div>
                </div>


                    <div className="DeleteFilePath componetSet">
                        <div  className="headSpecificSetting">Delete  path</div>
                        <div>
                           <div>select   path</div>
                            <div>
                                <select className="inputFieldForSetting">
                                <option></option>
                                </select>
                            </div>
                         </div>
                         <div>
                            <button>save</button>
                             <button>cancel</button>
                         </div>
                    </div>


                    <div className="NameFilePath componetSet">
                        <div className="headSpecificSetting">Rename  path</div>
                        <div>
                            <div>select path</div>
                            <div>
                                <select  className="inputFieldForSetting">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div>
                               <div>input new name</div>
                               <div>
                                <input type="text" className="inputFieldForSetting"/>
                                </div>
                        </div>
                        <div>
                             <button>save</button>
                             <button>cancel</button>
                          </div>
                    </div>

                       
                    <div className="rolesAdd componetSet">
                        <div className="headSpecificSetting">Add role</div>
                     <div>
                        <div>input new role</div>
                        <div><input type="text" className="inputFieldForSetting"></input></div>
                     </div>
                     <div>
                        <button>save</button>
                        <button>cancel</button>
                     </div>
                    </div>

                    <div className="delete role componetSet">
                        <div className="headSpecificSetting">Delete role</div>
                        <div>
                            <div>select role</div>
                            <div>
                                <select className="inputFieldForSetting">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div>
                         <button>save</button>
                          <button>cancel</button>
                         </div>
                    </div>

                    <div className="modifyRole componetSet">
                        <div className="headSpecificSetting"> Modify role</div>
                        <div>
                            <div >select role</div>
                            <div>
                                <select className="inputFieldForSetting">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>Rename</div>
                            <div><input type="text" className="inputFieldForSetting"/></div>
                        </div>
                        <div>
                           <button>save</button>
                           <button>cancel</button>
                         </div>
                    </div>
                </div>

          

     
    )
}