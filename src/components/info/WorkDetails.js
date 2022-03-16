import { Image, Stack } from "react-bootstrap";

function getCovers(workObject) {
  if (workObject.covers) {
    const covers = [];

    for (let index = 0; index < workObject.covers.length; index++) {
      covers.push(
        <Image
          key={index}
          src="https://covers.openlibrary.org/b/id/1535693-L.jpg"
        ></Image>
      );
    }
  } else {
    return <a>No cover available</a>;
  }
}

function getSubjects(workObject) {
  if (workObject.subjects) {
    const subjects = [];

    for (let index = 0; index < workObject.subjects.length; index++) {
      subjects.push(<a key={index}>{`${workObject.subjects[index]}, `}</a>);
    }

    return (
      <Stack direction="horizontal" gap={1}>
        <label>Subjects: </label>
        <a>{subjects}</a>
      </Stack>
    );
  } else {
    return <a>No subjects available</a>;
  }
}

function getDescription(workObject) {
  const description = workObject.description || workObject.summary;

  if (description) {
    return (
      <Stack direction="horizontal" gap={1}>
        <label>Description/Summary: </label>
        <a>{description}</a>
      </Stack>
    );
  } else {
    return <a>No description available</a>;
  }
}

function getFirstSentence(workObject) {
  const firstSentence = workObject.first_sentence || workObject.firstSentence;

  if (firstSentence) {
    return (
      <Stack direction="horizontal" gap={1}>
        <label>First Sentence: </label>
        <a>{firstSentence}</a>
      </Stack>
    );
  } else {
    return <a>No first sentence available</a>;
  }
}

function WorkDetails(props) {
  const { workObject } = props;

  return (
    <Stack gap={1}>
      <h2>{workObject.title}</h2>
      <Stack direction="horizontal" gap={1}>
        <label>First published date: </label>
        <a>{workObject.created.value}</a>
      </Stack>
      {getCovers(workObject)}
      {getSubjects(workObject)}
      {getDescription(workObject)}
      {getFirstSentence(workObject)}
    </Stack>
  );
}

export default WorkDetails;
