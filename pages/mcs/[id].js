import Link from 'next/link';

export default function Mcs({ mc }) {

  return (
    <div>
      <div>
        {mc.stageName}
      </div>
      <div>
        <ul>
          {mc.reppin}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request bars from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mcs/${context.params.id}`);
  // extract the data
  let { data } = await response.json();

  return {
    props: {
      mc: data,
    },
  };
}