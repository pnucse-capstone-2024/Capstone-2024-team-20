## 1. 프로젝트 소개
### 1.1. 배경 및 필요성
> 마이크로서비스 아키텍처(MSA)는 시스템을 소규모의 독립적인 서비스들로 분리하고,
각 서비스는 모듈 또는 프로젝트 단위로 나누어 개발 및 관리를 진행하는 소프트웨어 아
키텍처이다.
> 개발 시스템에서 결과물을 예측하기 위해서는 레퍼런스로 동작하는 모델이 필요하다.
그러나, 마이크로서비스 아키텍처를 제공하는 표준적인 모델은 존재하지 않으며, 표준 모
델을 제공하기에는 다양한 도메인의 모든 서비스 요구사항을 만족시키기 어렵다. 따라서,
특정 도메인에서 마이크로서비스 아키텍처를 제공할 수 있는 기반 구조가 필요하다

### 1.2. 목표 및 주요 내용
> 본 과제에서는 티켓 예매 시스템을 활용하는 티켓 판매자/티켓 구매자/시스템
관리자 입장의 요구사항을 반영하는 마이크로서비스 구축 및 배포 시스템을 제안한다.
제안하는 시스템은 티켓 예매 시스템에 필요한 기능 분석을 통해 티켓 예매 도메인에서
마이크로서비스가 동작 가능한 환경 및 기반 구조를 제시한다. 또한, 티켓 예매 시스템의
마이크로서비스 풀을 사전 구축하여 기본 흐름을 수행할 수 있게 함과 동시에, 개별 기
능들의 템플릿을 제공하는 것으로 티켓 예매에 필요한 각 이해관계자들의 요구사항이 반
영될 수 있도록 구축하였다.

## 2. 상세설계
### 2.1. 설계 상세화
#### 2.1.1 유스케이스 다이어그램

<p align="center">
    <img src="https://github.com/user-attachments/assets/49e1515b-6c02-4de0-bef9-57ac71e5cd4f" alt="마이크로서비스 관리 시스템 유스케이스">
    <br>
    마이크로서비스 관리 시스템 유스케이스
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/ae7fbfdf-f3c8-49d9-9847-9fb1b84be8e4" alt="티켓팅 시스템 유스케이스">
    <br>
    티켓팅 시스템 유스케이스
</p>

#### 2.1.2 클래스 다이어그램

<p align="center">
    <img src="https://github.com/user-attachments/assets/352ac5ce-b756-485a-bd31-33de46768feb" alt="시스템 배포 환경 모니터링 클래스 다이어그램">
    <br>
    시스템 배포 환경 모니터링 클래스 다이어그램
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/4ef35a2a-f864-452d-9ffe-9684493da7b0" alt="마이크로서비스 인프라 관리 클래스 다이어그램">
    <br>
    마이크로서비스 인프라 관리 클래스 다이어그램
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/17bf344f-72c0-4523-932f-6b4a0e5845fd" alt="클라이언트 시스템 클래스 다이어그램">
    <br>
    클라이언트 시스템 클래스 다이어그램
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/1e9a28c3-6516-47b4-9206-c466d0eac74f" alt="클라이언트 시스템 클래스 다이어그램2">
    <br>
    클라이언트 시스템 클래스 다이어그램2
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/645203d5-33cb-4775-a4d8-73b46a246c9e" alt="판매자 배포 서비스 클래스 다이어그램">
    <br>
    판매자 배포 서비스 클래스 다이어그램
</p>

#### 2.1.3 연구 결과 분석 및 평가

<p align="center">
    <img src="https://github.com/user-attachments/assets/b73d3584-ea04-43d1-a1d9-380fd77fa9e4" alt="배포 시간 테스트">
    <br>
    배포 시간 테스트
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/2344355f-9e7b-492a-a17e-eca0cce8d2ba" alt="부하 테스트">
    <br>
    부하 테스트
</p>

### 2.2. 연구 개발 환경

#### 개발 언어
- TypeScript 5.5.3
- Python 3.8.10
- OpenJDK 17.0.12

#### 프레임워크
- React 18.3.1
- FastAPI 0.111.1
- Spring 3.3.1

#### 빌드 도구
- Gradle 8.8

#### 실행 환경
- Google Cloud Platform (GCP)
- Windows 10
- Ubuntu 20.04 LTS
- Docker 27.3.1
- Kubernetes 1.30.5

#### 모니터링 도구
- Prometheus 2.54.1

#### 데이터베이스
- MySQL 9.0.1

#### 형상 관리
- Git 2.25.1
- GitHub

---

## 3. 📥 설치 및 사용 방법

- 서비스 URL : http://cse.ticketclove.com/page/main

- 자세한 사용방법은 시연 영상 및 보고서 참고

---

## 4. 🎥 소개 및 시연 영상

- 시연 영상 : https://www.youtube.com/watch?v=EWoIG3pVcTQ

> 위를 클릭하면 외부 사이트로 이동하여 시연 영상을 확인할 수 있습니다.

---

## 5. 👥 팀 소개

| **이름**  |  **역할**                                       |
|---------|----------------------------------------------|
| **조용진** | - 팀장<br>- 사용자 인증 서버 개발<br>- 공연 마이크로서비스 개발<br>- 티켓 판매자 요구사항에 따른 마이크로서비스 추가개발        |
| **강찬석** | - 클라우드 인프라 구축 및 관리 <br> - 시스템 관리 마이크로서비스 개발 <br>- 서비스 배포 시간 테스트|
| **이동현** | - 클라이언트 개발<br>- 마이크로서비스 개발<br>- 마이크로서비스 아키텍처 안정성 테스트<br>|
