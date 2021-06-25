import classNames from 'classnames';
import React, { useState } from 'react';

export const Collapse = (props) => {
  const [collapsed, setCollapsed] = useState(props.initCollapsed || props.collapsed)

  const toggle = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setCollapsed(!collapsed)
  };

  return (
    <div>
      <hr />
      <div className="form-group row">
        <label className="col-sm-2 control-label" />
        <div className="col-sm-10" onClick={toggle} style={{ cursor: 'pointer' }}>
          <span style={{ fontWeight: 'bold', marginTop: 7 }}>{props.label}</span>
          <button
            type="button"
            className="btn btn-access-negative pull-right btn-sm"
            style={{ float: 'right' }}
            onClick={toggle}>
            <i className={classNames("fas", { "fa-eye": collapsed, "fa-eye-slash": !collapsed })} />
          </button>
        </div>
      </div>
      {!collapsed && props.children}
      {props.lineEnd && <hr />}
    </div>
  );
}

export const Panel = (props) => {

  const [collapsed, setCollapsed] = useState(props.initCollapsed || props.collapsed)

  const toggle = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setCollapsed(!collapsed)
  };

  return (
    <div className="col-xs-12 col-sm-3">
      <div className="panel panel-primary" style={{ marginBottom: 0 }}>
        <div className="panel-heading" style={{ cursor: 'pointer' }} onClick={toggle}>
          {props.title}
        </div>
        {!collapsed && <div className="panel-body">{props.children}</div>}
      </div>
    </div>
  );
}
