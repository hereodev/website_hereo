import { MdCheckCircle } from 'react-icons/md';

type EventData = {
    publicationDate: Date;
    startDate?: Date;
    endDate?: Date;
    title: string;
    description: string;
    future?: boolean;
    author?: string;
  };
      
const Event: React.FC<{ event: EventData }> = ({ event }) => (
    <li>
    {event.future && <hr className="bg-primary" />}
    <div className="timeline-middle">
      <MdCheckCircle className={`w-5 h-5 ${event.future ? 'text-primary' : 'text-current'}`} />
    </div>
    <div className={`timeline-${event.future ? 'start' : 'end'} timeline-box`}>
      {event.startDate && event.endDate ? (
        <div className="font-mono italic">{event.startDate.toDateString()} - {event.endDate.toDateString()}</div>
      ) : null}
      <div className={`text-lg font-semibold ${event.future ? 'text-primary' : 'text-current'}`}>{event.title}</div>
      <div>{event.description}</div>
      <div className="text-xs">
        Published {event.publicationDate.toDateString()}
        {event.author && (
          <span> by {event.author}</span>
        )}
    </div>
    </div>
    <hr className={event.future ? 'bg-primary' : 'bg-current'} />
  </li>  
  );

{/* <li>
<div className={`timeline-${event.future ? 'start' : 'end'} timeline-box`}>
  <div className="text-lg font-black">{event.title}</div>
  <div>{event.description}</div>
  <div className="text-xs">Published {event.publicationDate.toDateString()}</div>
  {event.startDate && event.endDate && (
    <div className="font-mono italic">{event.startDate.toDateString()} - {event.endDate.toDateString()}</div>
  )}
</div>
<div className="timeline-middle">
  <MdCheckCircle className={`w-5 h-5 ${event.future ? 'text-primary' : 'text-current'}`} />
</div>
<hr className={event.future ? 'bg-primary' : 'bg-current'} />
</li> */}

export default function TheActs() {
    const eventsData: EventData[] = [
        {
          publicationDate: new Date('2022-01-01'),
          title: 'New Art Movement: FluxArt',
          description: 'A movement focused on dynamic, interactive installations.',
          startDate: new Date('2022-01-01'),
          endDate: new Date('2022-01-02'),
        },
        {
          publicationDate: new Date('2023-04-10'),
          title: 'Virtual Gallery Opening',
          description: 'First gallery exclusively in virtual reality, showcasing digital artists worldwide.',
          startDate: new Date('2023-04-10'),
          endDate: new Date('2023-04-11'),
        },
        {
          publicationDate: new Date('2024-04-01'),
          title: 'AI-Generated Art Exhibition',
          description: 'An exhibition featuring artworks created by advanced AI systems.',
          future: true,
        },
        {
          publicationDate: new Date('2024-05-15'),
          title: 'Community Art Festival',
          description: 'A festival celebrating local artists and their contributions to the community.',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-02'),
          future: true,
        },
        {
          publicationDate: new Date('2024-11-01'),
          title: 'Global Art Exchange',
          description: 'An event where artists from different countries exchange and collaborate on new projects.',
          startDate: new Date('2024-12-01'),
          endDate: new Date('2024-12-31'),
          future: true,
          author: 'Jane Da',
        },
      ];
      
      const sortedEvents = eventsData.sort((a, b) => {
        const dateA = a.startDate ? a.startDate : a.publicationDate;
        const dateB = b.startDate ? b.startDate : b.publicationDate;
        return dateB.getTime() - dateA.getTime();
      });
            
    return (
        <main>
            <h1>Encounters</h1>
            <p>Coming soon.</p>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {sortedEvents.map((event, index) => (
                    <Event key={index} event={event} />
                ))}
            </ul>
            
        </main>
    )
}