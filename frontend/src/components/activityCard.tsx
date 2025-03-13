import { Link } from "react-router-dom";
import { GetActivitiesDto } from "../dto/activity/GetActivitiesDto";
import { FiCalendar, FiTrash2, FiEdit2, FiMapPin, FiMessageSquare } from "react-icons/fi";
// import Modal from 'react-modal';
// import { customStyles } from "../services/modelStyles";

interface ActivityCardProps {
  activities: GetActivitiesDto[] | undefined;
  id: string;
  hasOwnership: boolean;
}

export default function ActivityCard({ activities, id, hasOwnership } : ActivityCardProps) {

  return (
    <div>
      {/* <Modal
          isOpen={showDeletePopup}
          onRequestClose={() => setShowDeletePopup(false)}
          style={customStyles}
          appElement={document.getElementById('contentChecklists') || undefined}
      >
          <DeletePopup
              trip={trip}
              setRefreshTrigger={setRefreshTrigger}
          />
      </Modal> */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-auto my-4" id="contentChecklists">
      {Array.isArray(activities) && activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id} className="w-full shadow-md border border-gray-200 rounded-md h-full max-h-64 min-h-64 p-4 flex flex-col">
            <div className="flex flex-row justify-between items-center mb-4">
              <span className="text-xl font-semibold">{activity.name}</span>
              {hasOwnership && (
                 <div className="flex gap-1">
                  <FiEdit2 className="text-xl cursor-pointer text-gray-800 hover:scale-105 transition ease-in-out" onClick={undefined}/>
                  <FiTrash2 className="text-xl cursor-pointer text-red-600 hover:scale-105 transition ease-in-out" onClick={undefined} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
                <FiCalendar />
                <span className="font-semibold">
                {new Date(activity.startDate).toLocaleDateString('fr-FR')}
                &nbsp;-&nbsp; 
                {new Date(activity.endDate).toLocaleDateString('fr-FR')}
                </span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-1 my-2">
                  <FiMapPin />
                  <span>{activity.location}</span>
              </div>
            )}
            {activity.cost && (
              <span>Cout: €{activity.cost}</span>
            )}
            {activity.description && (
              <div className="flex items-center gap-1 my-2">
                <FiMessageSquare />
                <span>{activity.description}</span>
            </div>
            )}
          </div>
        ))
      ) : (
        null
      )}
      {hasOwnership && (
          <Link to={`/trip/${id}/activity`} className="w-full shadow-md border border-gray-200 bg-gray-100 rounded-md h-full flex justify-center items-center min-h-64">
          <span className="text-5xl text-green-300">+</span>
      </Link>
      )}
    </div>
    </div>
  );
}