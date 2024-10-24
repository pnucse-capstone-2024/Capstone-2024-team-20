import requests
import time

def query_list():
    return [
        "cadvisor_version_info",
        "container_blkio_device_usage_total",
        "container_cpu_cfs_periods_total",
        "container_cpu_cfs_throttled_periods_total",
        "container_cpu_cfs_throttled_seconds_total",
        "container_cpu_load_average_10s",
        "container_cpu_system_seconds_total",
        "container_cpu_usage_seconds_total",
        "container_cpu_user_seconds_total",
        "container_file_descriptors",
        "container_fs_inodes_free",
        "container_fs_inodes_total",
        "container_fs_io_current",
        "container_fs_io_time_seconds_total",
        "container_fs_io_time_weighted_seconds_total",
        "container_fs_limit_bytes",
        "container_fs_read_seconds_total",
        "container_fs_reads_bytes_total",
        "container_fs_reads_merged_total",
        "container_fs_reads_total",
        "container_fs_sector_reads_total",
        "container_fs_sector_writes_total",
        "container_fs_usage_bytes",
        "container_fs_write_seconds_total",
        "container_fs_writes_bytes_total",
        "container_fs_writes_merged_total",
        "container_fs_writes_total",
        "container_last_seen",
        "container_memory_cache",
        "container_memory_failcnt",
        "container_memory_failures_total",
        "container_memory_kernel_usage",
        "container_memory_mapped_file",
        "container_memory_max_usage_bytes",
        "container_memory_rss",
        "container_memory_swap",
        "container_memory_usage_bytes",
        "container_memory_working_set_bytes",
        "container_network_receive_bytes_total",
        "container_network_receive_errors_total",
        "container_network_receive_packets_dropped_total",
        "container_network_receive_packets_total",
        "container_network_transmit_bytes_total",
        "container_network_transmit_errors_total",
        "container_network_transmit_packets_dropped_total",
        "container_network_transmit_packets_total",
        "container_oom_events_total",
        "container_processes",
        "container_scrape_error",
        "container_sockets",
        "container_spec_cpu_period",
        "container_spec_cpu_quota",
        "container_spec_cpu_shares",
        "container_spec_memory_limit_bytes",
        "container_spec_memory_reservation_limit_bytes",
        "container_spec_memory_swap_limit_bytes",
        "container_start_time_seconds",
        "container_tasks_state",
        "container_threads",
        "container_threads_max",
        "container_ulimits_soft",
        "machine_cpu_cores",
        "machine_cpu_physical_cores",
        "machine_cpu_sockets",
        "machine_memory_bytes",
        "machine_nvm_avg_power_budget_watts",
        "machine_nvm_capacity",
        "machine_scrape_error",
        "machine_swap_bytes",
        "scrape_duration_seconds",
        "scrape_samples_post_metric_relabeling",
        "scrape_samples_scraped",
        "scrape_series_added",
        "up"
    ]


# def instant_query(namespace, metric, url):
#     url = "http://{url}/dashboard/api/v1/query"

#     query =f'{metric}{{container="{container}", namespace="{namespace}"}}'

#     params={'query': query}
#     response = requests.get(url, params= params)

#     response = response.json()['data']['result']

#     return response


# def range_query(namespace: str, metric: str, start: int, end: int, step: str, url: str):
#     url = "http://{url}/dashboard/api/v1/query_range"

#     query =f'sum by (pod) (rate({metric}{{namespace="{namespace}"}}[5m]) * 100)'

#     params={'query': query, 'start': start, 'end': end, 'step': step}
#     response = requests.get(url, params= params)
#     print(response)

#     response = response.json()['data']['result']

#     return response
