import React from "react";
import { Input } from "reactstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Setting = () => {
  const onFormSubmit = () => {

  };

  return (
      <div className="page_responsive">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className='d-flex justify-content-start'>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <div className="row">
                  <div className="col-md-12">
                      <div className="card-header">
                       <h3><strong>Change Password</strong> </h3>
                      </div>
                      <div className="card-body">
                        <form onSubmit={onFormSubmit}>
                          <div className="form-group">
                            <Input
                              type="password"
                              className="form-control"
                              placeholder="Current Password"
                            />
                          </div>
                          <div className="form-group">
                            <Input
                              type="password"
                              className="form-control"
                              placeholder="New Password"
                            />
                          </div>
                          <div className="form-group">
                            <Input
                              type="password"
                              className="form-control"
                              placeholder="Confirm New Password"
                            />
                          </div>
                          <button type={'submit'} className={' mt-2 px-5 btn btn-send btn-block'} style={{ backgroundColor: "blue", color: "white" }}>Submit</button>
                        </form>
                      </div>
                  </div>
                </div>
      </div>
  );
}
export default Setting;