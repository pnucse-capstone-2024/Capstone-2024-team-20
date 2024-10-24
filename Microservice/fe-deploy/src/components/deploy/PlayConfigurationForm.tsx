import { useEffect, useState } from 'react';
import Label from '../common/Label';
import Input from '../common/Input';
import Button from '../common/Button';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { deployEvent, getEvent, updateEvent } from '../../apis/event';
import styles from '../styles/PlayConfigurationForm.module.css';
import { getTemplateList } from '../../apis/template';
import { Image, Merchandise, Template } from '../../utils/type';
import { deleteService, updateService } from '../../apis/deploy';
import { urlToBlob } from '../../utils/convert';
import Loading from '../common/Loading';
import UploadThumbnailImage from './UploadThumbnailImage';
import UploadDescriptionImage from './UploadDescriptionImage';
import AddMerchandise from './AddMerchandise';
import { sleep } from '../../utils/delay';

interface PlayConfigurationFormProps {
  namespace: string;
}

export default function PlayConfigurationForm({ namespace }: PlayConfigurationFormProps) {
  const [data, setData] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState<Image>(null);
  const [descriptionImage, setDesctiptionImage] = useState<Image>(null);
  const [cast, setCast] = useState('');
  const [eventDate, setEventDate] = useState([]);
  const [bookingStartDate, setBookingStartDate] = useState<string>('');
  const [bookingEndDate, setBookingEndDate] = useState<string>('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateList, setTemplateList] = useState<Template[]>([]);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [templateType, setTemplateType] = useState<string[]>([]);

  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);

  useEffect(() => {
    fetchWithHandler(() => getEvent(namespace), {
      onSuccess: async (response) => {
        setData(response.data[0]);
        setCast(response.data[0].cast);
        setEventDate([...response.data[0].eventTime]);
        setBookingStartDate(response.data[0].bookingStartDate);
        setBookingEndDate(response.data[0].bookingEndDate);
        setDescription(response.data[0].description.text.join('\n'));

        setSelectedTemplate(response.data[0].template);

        if (response.data[0].image && response.data[0].description.image) {
          const thumbnailData = await urlToBlob(response.data[0].image);
          const descriptionImageData = await urlToBlob(response.data[0].description.image);

          setThumbnailImage({
            data: thumbnailData.data,
            ext: thumbnailData.ext,
            url: response.data[0].image,
          });

          setDesctiptionImage({
            data: descriptionImageData.data,
            ext: descriptionImageData.ext,
            url: response.data[0].description.image,
          });
        }

        const merchandiseData = response.data[0].merches;

        if (merchandiseData?.length > 0) {
          const merchandisePromiseResult: Merchandise[] = await Promise.all(
            merchandiseData.map(async (m) => {
              const merchandiseImageData = await urlToBlob(m.image);

              return {
                image: {
                  url: m.image,
                  ext: merchandiseImageData.ext,
                  data: merchandiseImageData.data,
                },
                name: m.name,
                price: m.price,
                count: m.count,
              };
            }),
          );

          setMerchandises(merchandisePromiseResult);
        }
      },
      onError: () => {},
    });

    fetchWithHandler(() => getTemplateList(), {
      onSuccess: (response) => {
        setTemplateList(response.data);
      },
      onError: () => {},
    });
  }, [namespace]);

  useEffect(() => {
    if (templateList.length > 0 && selectedTemplate !== '') {
      setTemplateType(templateList.find((t) => t[0] === selectedTemplate)[1].type);
    }
  }, [namespace, templateList, selectedTemplate]);

  const handleUpdate = async () => {
    if (!(cast
      && eventDate.length > 0
      && bookingStartDate
      && bookingEndDate
      && description !== ''
      && selectedTemplate !== '')) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    setIsUpdating(true);
    let flag = false;

    if (data.template !== selectedTemplate) {
      await fetchWithHandler(() => updateService({
        namespace,
        templateName: selectedTemplate,
      }), {
        onSuccess: () => {
          flag = true;
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      flag = true;
    }

    if (flag) {
      const formData = new FormData();

      if (data.template !== selectedTemplate) {
        await sleep(90000);
      }

      const merchandiseData = merchandises.map((m) => ({
        name: m.name,
        price: m.price,
        count: m.count,
      }));

      console.log(merchandiseData);

      let eventData: any;

      if (templateType?.includes('merchandise')) {
        eventData = {
          name: data?.name,
          cast,
          venue: data?.venue,
          template: selectedTemplate,
          eventTime: eventDate,
          startDate: eventDate[0].split(' ')[0],
          endDate: eventDate[eventDate.length - 1].split(' ')[0],
          bookingStartDate,
          bookingEndDate,
          description: {
            text: description.split('\n'),
          },
          // seatsAndPrices: data?.seatsAndPrices,
          merches: merchandiseData,
        };
        console.log(eventData);
      } else {
        eventData = {
          name: data?.name,
          cast,
          venue: data?.venue,
          template: selectedTemplate,
          startDate: eventDate[0].split(' ')[0],
          endDate: eventDate[eventDate.length - 1].split(' ')[0],
          bookingStartDate,
          bookingEndDate,
          eventTime: eventDate,
          description: {
            text: description.split('\n'),
          },
          // seatsAndPrices: data?.seatsAndPrices,
        };
        console.log(eventData);
      }

      // console.log(eventData);
      const eventDataJson = JSON.stringify(eventData);

      formData.append('event', new Blob([eventDataJson], { type: 'application/json' }), 'venue.json');
      formData.append('descriptionImage', descriptionImage.data, `description.${descriptionImage.ext}`);
      formData.append('image', thumbnailImage.data, `thumbnail.${thumbnailImage.ext}`);

      if (templateType?.includes('merchandise')) {
        merchandises.forEach((m, i) => {
          formData.append('merchImages', m.image.data, `merch-${i}.${m.image.ext}`);
        });
      }

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      await fetchWithHandler(() => deployEvent({
        data: formData,
        namespace,
      }), {
        onSuccess: () => {
          alert('공연 수정이 완료되었습니다.');

          window.location.href = process.env.NODE_ENV === 'production'
            ? 'http://cse.ticketclove.com/page/main/owner'
            : 'http://localhost:3000/page/main/owner';
        },
        onError: (error) => {
          alert('공연 수정에 실패했습니다.');
          console.error(error);
        },
      });
    } else {
      alert('공연 수정에 실패했습니다.');
    }

    setIsUpdating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    await fetchWithHandler(() => deleteService({ namespace }), {
      onSuccess: () => {},
      onError: () => {},
    });

    alert('공연이 삭제되었습니다.');

    setIsDeleting(false);

    window.location.href = process.env.NODE_ENV === 'production'
      ? 'http://cse.ticketclove.com/page/main/owner'
      : 'http://localhost:3000/page/main/owner';
  };

  return (
    <form className={styles.container}>
      <select
        onChange={(e) => {
          setSelectedTemplate(e.target.value);
        }}
        value={selectedTemplate}
      >
        <option
          key=""
          value=""
        >
          템플릿을 선택하세요
        </option>
        {templateList.map(([templateName, templateInfo]) => (
          <option
            key={templateName}
            value={templateName}
          >
            {templateInfo.nickname}
          </option>
        ))}
      </select>
      {/* <img
        src={data?.image}
        alt="공연 썸네일"
        className={styles.thumbnailImage}
      /> */}
      <UploadThumbnailImage
        image={thumbnailImage}
        setImage={setThumbnailImage}
      />
      <div className={styles.category}>
        <div className={styles.categoryName}>공연 제목</div>
        <div className={styles.disabled}>{data?.name}</div>
      </div>
      <div className={styles.category}>
        <div className={styles.categoryName}>공연 식별자</div>
        <div className={styles.disabled}>{namespace}</div>
      </div>
      <Label name="출연진">
        <Input
          type="text"
          name="출연진"
          value={cast}
          setValue={setCast}
        />
      </Label>
      <div className={styles.category}>
        <div className={styles.categoryName}>공연 장소</div>
        <div className={styles.disabled}>{data?.venue}</div>
      </div>
      <div className={styles.category}>
        <div className={styles.categoryName}>좌석 별 가격</div>
        <ul className={`${styles.priceList} ${styles.disabled}`}>
          {data?.seatsAndPrices && data?.seatsAndPrices.map(({
            id, section, price,
          }) => (
            <li key={id}>
              {section}
              {' '}
              구역:
              {' '}
              {price}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.category}>
        <div className={styles.categoryName}>회차 정보</div>
        {eventDate.map((e) => (
          <div
            key={e}
            className={styles.disabled}
          >
            {e}
          </div>
        ))}
      </div>
      {/* <AddEventDate
        eventDate={eventDate}
        setEventDate={setEventDate}
      /> */}
      <Label name="공연 예매 기간">
        <input
          type="date"
          value={bookingStartDate}
          onChange={(e) => setBookingStartDate(e.target.value)}
          max={bookingEndDate}
        />
        부터
        <input
          type="date"
          value={bookingEndDate}
          onChange={(e) => setBookingEndDate(e.target.value)}
          min={bookingStartDate}
        />
        까지
      </Label>
      <Label name="공연 설명">
        <Input
          type="textbox"
          name="공연 설명"
          value={description}
          setValue={setDescription}
        />
      </Label>
      {/* <img
        src={data?.description.image}
        alt="공연 설명 첨부 이미지"
        className={styles.descriptionImage}
      /> */}
      <UploadDescriptionImage
        image={descriptionImage}
        setImage={setDesctiptionImage}
      />
      {templateType?.includes('merchandise') && (
      <AddMerchandise
        merchandises={merchandises}
        setMerchandises={setMerchandises}
      />
      )}
      {isUpdating ? (
        <div>
          <div>공연 수정 중입니다.</div>
          <div>최대 3분까지 소요될 수 있습니다.</div>
          <Loading />
        </div>
      ) : (
        <Button
          onClick={handleUpdate}
          disabled={isDeleting}
        >
          공연 수정하기
        </Button>
      )}
      {isDeleting ? <Loading /> : (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={isUpdating}
        >
          공연 삭제하기
        </button>
      )}
    </form>
  );
}
