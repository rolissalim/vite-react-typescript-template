import styled from 'styled-components';

export const ReactTableStyle: any = styled.div`
  display: block;
  max-width: 100%;
  &.tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  table {
    width: 100%;
    border-spacing: 0;
    font-weight: 400;
    color: var(--black);
    border-bottom: 1px solid var(--black-50);
    background-color: transparent;
    font-family:  "Rubik", sans-serif;
    thead {
      tr {
        background-color: var(--black-50);
        th#action:last-child {
          background-color: var(--black-50);
        }
      }
      position:'sticky'
    }
    tbody {
      tr {
        border-bottom: 1px solid var(--black-50);
      }
      tr:hover {
        background-color: #eff2f7;
      }
    }

    th{
      font-weight:600;
      margin: 0;
      padding: .5rem .75rem;
      border-bottom: none;
      min-width: 5%;
      &#action,&#button_status {
        :last-child {
          border-right: 0;
          position: sticky !important;
          right: -1px;
          background-color: var(--vz-light);
        }
        :focus-within {
          z-index: 3;
        }
      }
    }
    td {
      margin: 0;
      padding: .5rem .75rem;
      min-width: 5%;
      &#action,&#button_status {
        :last-child {
          border-right: 0;
          position: sticky;
          right: -1px;
          background-color: var(--vz-card-bg);
        }
        :focus-within {
          z-index: 3;
        }
      }
    }

    td#action,td#button_status {
      :last-child {
        padding-left:0;
        padding-right:0;
        border-right: 0;
        position: sticky;
        text-align: right;
        right: -1px;
        background-color: var(--vz-card-bg);
      }
      :focus-within {
        z-index: 3;
      }
    }
  }
`;
