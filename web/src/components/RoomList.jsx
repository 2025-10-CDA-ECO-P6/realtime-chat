import React from 'react';
import '../styles/components.scss';

const RoomList = ({ rooms, activeRoom, onJoin, onCreate }) => {
    return (
        <div className="room-list">

            <div className="room-list__category">SALONS TEXTUELS</div>

            {rooms.map((r, idx) => (
                <div
                    key={idx}
                    className={`room-list__item ${activeRoom === r.name ? 'room-list__item--active' : ''}`}
                    onClick={() => onJoin(r.name)}
                >
                    <span className="room-list__icon">#</span>
                    <span className="room-list__name">{r.name}</span>
                    {r.count > 0 && <span className="room-list__badge">{r.count}</span>}
                </div>
            ))}

            <div
                className="room-list__item room-list__item--create"
                onClick={onCreate}
            >
                <span className="room-list__icon">+</span>
                <span className="room-list__name">Créer un salon</span>
            </div>
        </div>
    );
};

export default RoomList;
