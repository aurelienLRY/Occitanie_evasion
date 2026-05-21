import { buildActivityProductSchemas } from '@/lib/activity-product-schema';
import { fetchActivities, findActivityByName } from '@/lib/server/fetchActivities';

type ActivityProductSchemaServerProps = {
  activityName: string;
};

export async function ActivityProductSchemaServer({
  activityName,
}: ActivityProductSchemaServerProps) {
  try {
    const activities = await fetchActivities();
    const activity = findActivityByName(activities, activityName);
    if (!activity) return null;

    const schemas = buildActivityProductSchemas(activity, activityName);

    return (
      <>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </>
    );
  } catch (e) {
    console.error('[ActivityProductSchemaServer]', activityName, e);
    return null;
  }
}
