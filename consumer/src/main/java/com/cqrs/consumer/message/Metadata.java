package com.cqrs.consumer.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Metadata {

    private String timestamp;

    @JsonProperty("record-type")
    private String recordType;

    private String operation;

    @JsonProperty("partition-key-type")
    private String partitionKeyType;

    @JsonProperty("schema-name")
    private String schemaName;

    @JsonProperty("table-name")
    private String tableName;

    @JsonProperty("transaction-id")
    private String transactionId;
}
