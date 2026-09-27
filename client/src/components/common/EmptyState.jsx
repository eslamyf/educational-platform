import React from 'react';
import { Link } from 'wouter';
export const EmptyState = ({ icon: Icon, title, description, actionText, actionHref, onAction, className = '', }) => {
    return (<div className={`empty-state ${className}`}>
      {Icon && (<div className="empty-state-icon">
          <Icon size={28}/>
        </div>)}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {actionText && (actionHref ? (<Link href={actionHref} className="btn btn-primary" onClick={onAction}>
            {actionText}
          </Link>) : (<button type="button" className="btn btn-primary" onClick={onAction}>
            {actionText}
          </button>))}
    </div>);
};
export default EmptyState;
