import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import SectionTitle from '@con/components/common/SectionTitle';
import { PageProps, useStaticQuery, graphql } from 'gatsby';
import { convertTime } from '@con/utils';
import Button from '@con/components/common/Button';
import { Conference, Track } from 'src/con/types';
import useConferences from '@con/hooks/useConferences';
import SpeakerSocialList from '@con/components/2021/Speakers/SpeakerSocialList';
import '@con/styles/index.scss';

export const SpeakerConferenceSlot: React.ComponentType<{ conference: Conference; tracks: Track[] }> = ({
  tracks,
  conference,
}) => {
  const track = tracks.find((t) => t.id === conference.track);
  const { start, end, title, slug, short } = conference;
  return (
    <div className="speaker__conference-slot dotted-corner">
      <div className="conference__track">
        <span className="h6">{`Track #${track.id}`}</span>
        <span className="overline">{track.type}</span>
      </div>
      <div className="conference__content">
        <span className="overline">
          {start && end ? `Sep, 10 2021 · ${convertTime(start)} - ${convertTime(end)}` : 'Sep, 10 2021'}
        </span>
        <h3 className="h6 lined lined-left">{title}</h3>
        <p>{short}</p>
        <Button className="square" size="small" to={slug}>
          See details
        </Button>
      </div>
    </div>
  );
};

interface SpeakerTemplateProps extends PageProps {
  pageContext: {
    html: string;
    title: string;
    id: string;
    name: string;
    slug: string;
    job: string;
    description: string;
  };
  tracks: Track[];
}

const SpeakerTemplate: React.ComponentType<SpeakerTemplateProps> = ({ tracks, pageContext }) => {
  const { id, name, job, description, slug } = pageContext;
  const conferences = useConferences(id);
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "speakersImages" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  `);
  const image = getImage(data.allFile.nodes.find((imageData) => imageData.name === id));
  const firstname = name.split(' ')[0];
  return (
    <div className="conf__speaker-profile">
      <div className="speaker__header">
        <SectionTitle dark lined h1>
          <strong>{name}</strong>
        </SectionTitle>
        <div className="overline speaker__job">{job}</div>
      </div>
      <div className="container">
        <div className="speaker__about">
          <div className="speaker__picture">
            <div className="circle__effect">
              <GatsbyImage image={image} className="circle__picture" alt={name} />
            </div>
          </div>
          <div className="speaker__details">
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <SpeakerSocialList speaker={{ id, description, name, job, slug }} />
          </div>
          {0 < conferences.length ? (
            <div className="speaker__schedule">
              <h2 className="schedule__title h5">{`${firstname}'s schedule`}</h2>
              {conferences.map((conference) => (
                <SpeakerConferenceSlot conference={conference} tracks={tracks} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SpeakerTemplate;